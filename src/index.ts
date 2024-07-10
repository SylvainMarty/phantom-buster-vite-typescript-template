/* eslint-disable ts/no-var-requires */
/* eslint-disable ts/no-require-imports */
import { validate, type, string } from 'superstruct'

// Keep these require() here for Phantombuster agent compatibility
const Buster = require('phantombuster')
const puppeteer = require('puppeteer')

const buster = new Buster()

const MyScriptArguments = type({
  something: string(),
})

;(async () => {
  const [err, args] = validate(buster.argument, MyScriptArguments)
  if (err) {
    console.error('Argument validation failed', err)
    process.exit(1)
  }
  console.log('Argument validation passed', args)

  const browser = await puppeteer.launch({
    // This is needed to run Puppeteer in a Phantombuster container
    args: ['--no-sandbox'],
  })
  console.log('Browser launched!')

  const page = await browser.newPage()

  // core of your scrapper should go there!
  await page.goto("https://news.ycombinator.com")
  await page.waitForSelector("#hnmain")

  const hackerNewsLinks = await page.evaluate(() => {
    // we are in the browser's context
    const data: { title: string; url: string }[] = []
    document.querySelectorAll("a.storylink").forEach((element) => {
      data.push({
        title: element.text,
        url: element.getAttribute("href")
      })
    })
    return data
  })
  await buster.setResultObject(hackerNewsLinks)

  await page.close()
  await browser.close()
  console.log('Done!')
  process.exit()
})()

/* eslint-disable ts/no-var-requires */
/* eslint-disable ts/no-require-imports */
import { create } from 'superstruct'
import type { MyScriptArgumentsType } from './my-script'
import { MyScriptArguments, myScript } from './my-script'

// Keep these require() here for Phantombuster agent compatibility
const Buster = require('phantombuster')
const puppeteer = require('puppeteer')

const buster = new Buster()

;(async () => {
  // Automatically validate arguments
  let args: MyScriptArgumentsType
  try {
    args = create(buster.argument, MyScriptArguments)
  } catch (err) {
    console.error('Argument validation failed', err)
    process.exit(1)
  }

  const browser = await puppeteer.launch({
    // This is needed to run Puppeteer in a Phantombuster container
    args: ['--no-sandbox'],
  })
  console.log('Browser launched!')

  const page = await browser.newPage()

  // The core of your scrapper should go there!
  const results = await myScript(page, args)
  await buster.setResultObject(results)

  await page.close()
  await browser.close()
  console.log('Done!')
  process.exit()
})()

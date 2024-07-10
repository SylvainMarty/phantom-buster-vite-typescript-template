/// <reference lib="dom" />
import type { Page } from 'puppeteer'
import type { Infer } from 'superstruct'
import { string, type } from 'superstruct'

export const MyScriptArguments = type({
  something: string(),
})

export interface MyScriptResult {
  title: string
  url: string
}

export async function myScript(page: Page, args: Infer<typeof MyScriptArguments>): Promise<MyScriptResult[]> {
  console.log('Argument value is', args.something)

  await page.goto('https://news.ycombinator.com')
  await page.waitForSelector('#hnmain')

  return page.$$eval('tr.athing', async (elements) => {
    // we are in the browser's context
    const data: MyScriptResult[] = []
    elements.forEach((element) => {
      const link = element.querySelector('.titleline > a')
      data.push({
        title: link?.textContent ?? 'N/A',
        url: link?.getAttribute('href') ?? 'N/A',
      })
    })
    return data
  })
}

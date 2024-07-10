/// <reference lib="dom" />
import type { Page } from 'puppeteer'
import type { Infer } from 'superstruct'
import { defaulted, number, string, type } from 'superstruct'

const SCRAPPING_TIMEOUT = 5_000 // milliseconds

export const MyScriptArguments = type({
  something: string(),
  timeout: defaulted(number(), SCRAPPING_TIMEOUT),
})

export type MyScriptArgumentsType = Infer<typeof MyScriptArguments>

export interface MyScriptResult {
  title: string
  url: string
}

export async function myScript(page: Page, args: MyScriptArgumentsType): Promise<MyScriptResult[]> {
  console.log('Argument value is', args.something)

  await page.goto('https://news.ycombinator.com')
  await page.waitForSelector('#hnmain', { timeout: args.timeout })

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

import { test, expect, Page,BrowserContext } from '@playwright/test';
import { click, confirmSite, makeAMove, restartGame } from '../main/ReusableMethods';

//declare global page variable
let context: BrowserContext
let page: Page
test.beforeAll(async ({ browser }) => {
   const context = await browser.newContext()
   page = await browser.newPage()
})//end of beforeAll

test('Checkers Game', async () => {
   await page.goto("https://www.gamesforthebrain.com/game/checkers/") // go to he checkers site
   await confirmSite(page,"https://www.gamesforthebrain.com/game/checkers/") //verify the site
   await makeAMove(page,"//*[@onclick='didClick(2, 2)']","//*[@onclick='didClick(1, 3)']", "First Move") //First move
   await makeAMove(page,"//*[@onclick='didClick(3, 1)']","//*[@onclick='didClick(2, 2)']", "Second Move") //Second move
   await makeAMove(page,"//*[@onclick='didClick(4, 0)']","//*[@onclick='didClick(3, 1)']", "Third Move") //Third move
   await makeAMove(page,"//*[@onclick='didClick(4, 2)']","//*[@onclick='didClick(2, 4)']", "Fourth Move (Took a blue piece) ") //Fourth move and caught a blue
   await makeAMove(page,"//*[@onclick='didClick(1, 3)']","//*[@onclick='didClick(0, 4)']", "Fift Move") //Fifth move
   await restartGame(page,"//*[@href='./']","Restarted") //Game restarted
   await page.waitForTimeout(3000) //wait before window close
})
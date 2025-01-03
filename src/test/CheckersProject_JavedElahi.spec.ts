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

/*

This project uses Playwright to automate the interaction with a Checkers game. After navigating to the site - I first varified the site using the confirmSite function. Then proceeded to make five legal moves as orange using the makeAMove funtion. That incormprates
the validation of the game rules using the if and else to make sure the game procedded according to the rule. I then took a blue piece in the fourth move. After the game was finished using five moves. Then I used the restartGame funtion - used validattioin using if and else to make sure
the game has indeed restarted usinf the promt message that appears before the game which verified the game has restarted susccesfully.

that has reusable actions such as makeAMove, restartGame and confirmSite funtions that are needed for the test case. I first Navigated to the site "https://www.gamesforthebrain.com/game/checkers/" and did manual testing
2. Confirm that the site is up
3. Make five legal moves as orange:
a) Include taking a blue piece
b) Use “Make a move” as confirmation that you can take the next step
c) Restart the game after five moves
d) Confirm that the restarting had been successful

*/
import http from 'http'
import path from 'path'
import {Server} from 'node-static'
import createTestCafe from 'testcafe'

let testcafe
let staticServer = new Server(path.join(__dirname, '../../dist'))

let testServer = http.createServer((req, res) => {
  req.addListener('end', () => {
    staticServer.serve(req, res)
  }).resume()
}).listen(5002)

createTestCafe('localhost', 5000, 5001)
  .then(tc => {
    testcafe = tc

    const runner = testcafe.createRunner()

    let testFiles = [
      'basic.js'
    ]

    testFiles = testFiles.map(filename => (
      path.join(__dirname, filename)
    ))

    return runner
      .src(testFiles)
      .browsers([
        'chrome:headless'
      ])
      .run()
  })
  .then(failedCount => {
    console.log(`Tests failed: ${failedCount}`)
    testcafe.close()
    testServer.close()
  })
  .catch(err => console.error(err))

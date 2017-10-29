import {Selector} from 'testcafe'<% if (react) { %>
import ReactSelector from 'testcafe-react-selectors'<% } %>

fixture(`Getting Started`)
  .page(`http://localhost:5002`)

test('My first test', async t => {
  await t
    .expect(Selector('.container h1').innerText).eql('Welcome')
})<% if (react) { %>

test('React App test', async t => {
  const app = ReactSelector('App')
  const title = app.find('.app-title')

  await t
    .expect(title.innerText).eql('App')
})<% } %>

const ReactRedux = require("react-redux")
const React = require("react")
const InteractivePart = require("./interactive-part")
const H = require("./helpers")
const $ = React.createElement

function mapStateToProps(state) {
  return {state}
}

function $A(href, text) {
  function onClick(event) {
    event.preventDefault()
    H.openUrl(href)
  }
  return $("a", {onClick, href}, text)
}

const homePage = "https://screenhive.net"
const myPage = "http://mockbrian.com"

function Screenhive(props) {
  const state = props.state
  return $("main", {},
    $("p", {className: "Flex-0-0"},
      `Follow the `,
      $A(homePage, `Steam setup instructions`),
      ` to create a screenshot folder before using this app.`
    ),
    $("p", {className: "Flex-0-0"},
      `Your screenshots will be organized into folders
      based on the title of the game in Steam.`
    ),
    $(InteractivePart, {state}),
    $("p", {className: "Flex-0-0 Info Copyright"},
      `Copyright © 2016 `,
      $A(myPage, `Brian Mock`)
    )
  )
}

module.exports = ReactRedux.connect(mapStateToProps)(Screenhive)

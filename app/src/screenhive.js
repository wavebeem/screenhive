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
  const className = "pointer link white b--white-60 bb"
  return $("a", {className, onClick, href}, text)
}

const homePage = "https://screenhive.net"
const myPage = "http://mockbrian.com"

function Screenhive(props) {
  const state = props.state
  return $("main", {className: "flex flex-column fixed-full ph3 mw6 center"},
    $("p", {className: "flex-none"},
      `Follow the `,
      $A(homePage, `Steam setup instructions`),
      ` to create a screenshot folder before using this app.`
    ),
    $("p", {className: "flex-none"},
      `Your screenshots will be organized into folders
      based on the title of the game in Steam.`
    ),
    $(InteractivePart, {state}),
    $("p", {className: "flex-none tc"},
      `Copyright © 2016 `,
      $A(myPage, `Brian Mock`)
    )
  )
}

module.exports = ReactRedux.connect(mapStateToProps)(Screenhive)

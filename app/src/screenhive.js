const InteractivePart = require("./interactive-part")
const electron = require("electron")
const shell = electron.shell
const ReactRedux = require("react-redux")
const React = require("react")
const $ = React.createElement

function mapStateToProps(state) {
  return {state}
}

function $A(href, text) {
  function onClick(event) {
    event.preventDefault()
    shell.openItem(href)
  }
  return $("a", {onClick, href}, text)
}

const wikiUrl = "https://github.com/wavebeem/screenhive/wiki"
const homePage = "https://github.com/wavebeem/screenhive"
const myPage = "http://mockbrian.com"

function Screenhive(props) {
  const state = props.state
  return $("main", {},
    $("p", {className: "Flex-0-0"},
      `Your PNG screenshots will be organized into folders
      based on the title of the game in Steam.`
    ),
    $("p", {className: "Flex-0-0"},
      `Set up `,
      $A(wikiUrl, `PNG screenshots for Steam`),
      ` before using Screenhive.`
    ),
    $("p", {className: "Flex-0-0"},
      `Visit the `,
      $A(homePage, `Screenhive website`),
      ` for more information.`
    ),
    $(InteractivePart, {state}),
    $("p", {className: "Flex-0-0 Info Copyright"},
      `Copyright © 2016 `,
      $A(myPage, `Brian Mock`)
    )
  )
}

module.exports = ReactRedux.connect(mapStateToProps)(Screenhive)

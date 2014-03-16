Touchy
======

    Observable = require "observable"

    MAX = 1

Get x,y position changes from mouse and touch events in an html element.

    module.exports = (element, {x,y}={}) ->

      x = Observable(x)
      y = Observable(y)

      # Keep track of if the mouse is active in the element
      active = false

      emit = (e) ->
        position = localPosition(element, e)

        x(position.x)
        y(position.y)

When we click within the element emit the values for the position we clicked at.

      listen element, "mousedown", (e) ->
        active = true

        emit e

Handle touch starts

      listen element, "touchstart", (e) ->
        # NOTE: Global `event`
        processTouches event, emit

When the mouse moves apply a change for each x value in the intervening positions.

      listen element, "mousemove", (e) ->
        emit(e) if active

Handle moves outside of the element.

      listen document, "mousemove", (e) ->
        emit(e) if active

Handle touch moves.

      listen element, "touchmove", (e) ->
        # NOTE: Global `event`
        processTouches event, emit

Handle releases.

      listen element, "mouseup", (e) ->
        emit e

        active = false

        return

Handle touch ends.

      listen element, "touchend", (e) ->
        # NOTE: Global `event`
        processTouches event, emit

Whenever the mouse button is released from anywhere, deactivate. Be sure to emit 
the position if it was activated within the element.

      listen document, "mouseup", (e) ->
        emit(e) if active
    
        active = false
    
        return

      x: x
      y: y

Helpers
-------

    localPosition = (element, event) ->
      rect = element.getBoundingClientRect()

      point =
        x: clamp (event.pageX - rect.left) / rect.width, 0, MAX
        y: clamp (event.pageY - rect.top) / rect.height, 0, MAX

      # Add mouse into touch identifiers as 0
      point.identifier = (event.identifier + 1) or 0

      return point

    processTouches = (event, fn) ->
      event.preventDefault()
  
      if event.type is "touchend"
        # touchend doesn't have any touches, but does have changed touches
        touches = event.changedTouches
      else
        touches = event.touches

      Array::forEach.call touches, fn

Attach an event listener to an element

    listen = (element, event, handler) ->
      element.addEventListener(event, handler, false)

Clamp a number to be within a range.

    clamp = (number, min, max) ->
      Math.min(Math.max(number, min), max)

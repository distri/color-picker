Throttle
========

A throttle is the mechanism by which the flow of a fluid is managed by constriction or obstruction.

`cycle` is the minimum time in seconds that will occur between emitting data.

Throttle is a pipe generator.

    module.exports = (cycle) ->
      lastFired = -Infinity
      lastValue = undefined
      timeout = null

      (output) ->
        (input) ->
          lastValue = input

          unless timeout
            currentTime = +new Date
            currentTime - lastFired

            timeout = setTimeout ->
              lastFired = +new Date
              output(lastValue)
              timeout = null
            , lastFired + (cycle / 1000)

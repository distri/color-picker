Throttle
========

A throttle is the mechanism by which the flow of a fluid is managed by constriction or obstruction.

`cycle` is the minimum time in seconds that will occur between emitting data.

Throttle is a pipe generator.

    module.exports = (cycle) ->
      lastFired = -Infinity
      lastValue = undefined
      timeout = null
      t = cycle * 1000 # ms

      (output) ->
        (input) ->
          lastValue = input

          unless timeout
            currentTime = +new Date
            delta = currentTime - lastFired
            target = t - delta

            timeout = setTimeout ->
              lastFired = +new Date
              output(lastValue)
              timeout = null
            , target

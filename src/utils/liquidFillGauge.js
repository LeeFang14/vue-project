import * as d3 from 'd3'
// liquidFillGauge.js

export class FluidGauge {
  constructor(elementId, value, config) {
    this.text1, this.text2

    this.elementId = elementId
    this.value = value
    if (config == null) {
      this.config = FluidGauge.liquidFillGaugeDefaultSettings()
    } else {
      this.config = config
    }
    config = this.config

    var gauge = d3.select('#' + this.elementId)
    gauge.node().gauge = this

    var radius = Math.min(parseInt(gauge.style('width')), parseInt(gauge.style('height'))) / 2
    var locationX = parseInt(gauge.style('width')) / 2 - radius
    var locationY = parseInt(gauge.style('height')) / 2 - radius
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue

    var waveHeightScale
    if (config.waveHeightScaling) {
      waveHeightScale = d3.scaleLinear().range([0, config.waveHeight, 0]).domain([0, 50, 100])
    } else {
      waveHeightScale = d3
        .scaleLinear()
        .range([config.waveHeight, config.waveHeight])
        .domain([0, 100])
    }

    this.waveHeightScale = waveHeightScale

    var textPixels = (config.textSize * radius) / 2
    var textFinalValue = parseFloat(value).toFixed(2)
    var textStartValue = config.valueCountUp ? config.minValue : textFinalValue
    this.percentText = config.displayPercent ? '%' : ''

    var circleThickness = config.circleThickness * radius
    var circleFillGap = config.circleFillGap * radius
    var fillCircleMargin = circleThickness + circleFillGap
    var fillCircleRadius = radius - fillCircleMargin
    var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100)

    this.fillCircleRadius = fillCircleRadius
    this.fillCircleMargin = fillCircleMargin

    var waveLength = (fillCircleRadius * 2) / config.waveCount
    var waveClipCount = 1 + config.waveCount
    var waveClipWidth = waveLength * waveClipCount
    var textRounder = function (value) {
      return Math.round(value)
    }

    this.waveClipWidth = waveClipWidth

    if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
      textRounder = function (value) {
        return parseFloat(value).toFixed(1)
      }
    }

    // data for building the clip wave area
    var data = []
    for (var i = 0; i <= 40 * waveClipCount; i++) {
      data.push({ x: i / (40 * waveClipCount), y: i / 40 })
    }

    // scales for drawing the outer circle
    var gaugeCircleX = d3
      .scaleLinear()
      .range([0, 2 * Math.PI])
      .domain([0, 1])
    var gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius])

    //scales for controlling the size fo the clipping path.
    var waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1])
    var waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1])

    // scales for controlling the position of the clipping path
    var waveRiseScale = d3
      .scaleLinear()
      .range([fillCircleMargin + fillCircleRadius * 2 + waveHeight, fillCircleMargin - waveHeight])
      .domain([0, 1])
    var waveAnimateScale = d3
      .scaleLinear()
      .range([0, waveClipWidth - fillCircleRadius * 2])
      .domain([0, 1])
    this.waveAnimateScale = waveAnimateScale
    // scale for controlling the position of the text within the gauge
    var textRiseScaleY = d3
      .scaleLinear()
      .range([fillCircleMargin + fillCircleRadius * 2, fillCircleMargin + textPixels * 0.7])
      .domain([0, 1])
    // center the gauge within the parent svg
    var gaugeGroup = gauge
      .append('g')
      .attr('transform', 'translate(' + locationX + ',' + locationY + ')')

    //debug
    //gaugeGroup.append("circle").attr("cx",0).attr("cy",0).attr("r",radius).attr("class","debug");

    // draw the outer circle
    var gaugeCircleArc = d3
      .arc()
      .startAngle(gaugeCircleX(0))
      .endAngle(gaugeCircleX(1))
      .outerRadius(gaugeCircleY(radius))
      .innerRadius(gaugeCircleY(radius - circleThickness))
    gaugeGroup
      .append('path')
      .attr('d', gaugeCircleArc)
      .style('fill', config.circleColor)
      .attr('transform', 'translate(' + radius + ',' + radius + ')')

    // text where the wave does not overlap
    this.text1 = gaugeGroup
      .append('text')
      .text(textRounder(textStartValue) + this.percentText)
      .attr('class', 'liquidFillGaugeText')
      .attr('text-anchor', 'middle')
      .attr('font-size', textPixels + 'px')
      .style('fill', config.textColor)
      .attr(
        'transform',
        'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')'
      )

    // the clipping wave area
    var clipArea = d3
      .area()
      .x(function (d) {
        return waveScaleX(d.x)
      })
      .y0(function (d) {
        return waveScaleY(
          Math.sin(
            Math.PI * 2 * config.waveOffset * -1 +
              Math.PI * 2 * (1 - config.waveCount) +
              d.y * 2 * Math.PI
          )
        )
      })
      .y1(function (d) {
        return fillCircleRadius * 2 + waveHeight
      })
    this.clipArea = clipArea

    var waveGroup = gaugeGroup
      .append('defs')
      .append('clipPath')
      .attr('id', 'clipWave' + elementId)
    this.waveGroup = waveGroup

    var wave = waveGroup.append('path').datum(data).attr('d', clipArea).attr('T', 0)
    this.wave = wave

    // the inner circle with the clipping wave attached
    var fillCircleGroup = gaugeGroup
      .append('g')
      .attr('clip-path', 'url(#clipWave' + elementId + ')')
    fillCircleGroup
      .append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', fillCircleRadius)
      .style('fill', config.waveColor)

    // text where the wave does overlap.
    this.text2 = fillCircleGroup
      .append('text')
      .text(textRounder(textStartValue) + this.percentText)
      .attr('class', 'liquidFillGaugeText')
      .attr('text-anchor', 'middle')
      .attr('font-size', textPixels + 'px')
      .style('fill', config.waveTextColor)
      .attr(
        'transform',
        'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')'
      )

    // make the value count up
    if (config.valueCountUp) {
      var pt = this.percentText
      var textTween = function () {
        var that = this
        var i = d3.interpolate(this.textContent, textFinalValue)
        return function (t) {
          that.textContent = textRounder(i(t)) + pt
        }
      }
      this.text1.transition().duration(config.waveRiseTime).tween('text', textTween)
      this.text2.transition().duration(config.waveRiseTime).tween('text', textTween)
    }

    // make the wave rise. wave and wavegroup are separate so vertical movement can be controlled
    var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth
    this.waveGroupXPosition = waveGroupXPosition

    if (config.waveRise) {
      waveGroup
        .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
        .transition()
        .duration(config.waveRiseTime)
        .attr(
          'transform',
          'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')'
        )
        .on('start', function () {
          // this transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false.
          // The wave will not position correctly without this, but it's not clear why this is actually necessary.
          wave.attr('transform', 'translate(1,0)')
        })
    } else {
      waveGroup.attr(
        'transform',
        'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')'
      )
    }

    this.animateWave = function () {
      var that = this
      wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)')
      //wave.attr("transform","translate("+waveAnimateScale(0)+",0)");
      wave
        .transition()
        .duration(config.waveAnimateTime * (1 - wave.attr('T')))
        .ease(d3.easeLinear)
        .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
        //.attr("T",1)
        .on('end', function () {
          wave.attr('T', 0)
          that.animateWave()
        })
    }
    if (config.waveAnimate) {
      this.animateWave()
    }

    // gauge.on('click', function () {
    //   var g = this.gauge
    //   g.update(newValue())
    // })
  }

  static liquidFillGaugeDefaultSettings() {
    return {
      minValue: 0, // The gauge minimum value.
      maxValue: 100, // The gauge maximum value.
      circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
      circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
      circleColor: '#178BCA', // The color of the outer circle.
      waveHeight: 0.2, // The wave height as a percentage of the radius of the wave circle.
      waveCount: 5, // The number of full waves per width of the wave circle.
      waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
      waveAnimateTime: 1000, // The amount of time in milliseconds for a full wave to enter the wave circle.
      waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
      waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
      waveAnimate: true, // Controls if the wave scrolls or is static.
      waveColor: '#178BCA', // The color of the fill wave.
      waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
      textVertPosition: 0.5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
      textSize: 1.5, // The relative height of the text to display in the wave circle. 1 = 50%
      valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
      displayPercent: true, // If true, a % symbol is displayed after the value.
      textColor: '#045681', // The color of the value text when the wave does not overlap it.
      waveTextColor: '#A4DBf8' // The color of the value text when the wave overlaps it.
    }
  }
}

function newValue() {
  var r = Math.random()
  if (r >= 0.5) {
    return parseInt(Math.random() * 100)
  } else {
    return (Math.random() * 100).toFixed(2)
  }
}

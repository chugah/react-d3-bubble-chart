import * as d3 from 'd3';

/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */


export function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => parseInt(d.Funding, 10));
    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([10, 65])
      .domain([0, maxAmount])

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
  const myNodes = rawData.map(d => ({
    id: d.id,
    radius: radiusScale(parseInt(d.Funding, 10)),
    value: d.Funding,
    name: d.Name,
    org: d.organization,
    group: d.group,
    year: d.start_year,
    market: d.Market,
    description: d.Description,
    date: d.Joined,
    stage: d.Stage,
    fundCat: d.FundingCat,
    employees: d.Employees,
    stack: d.Stack,
    genCat:d.GenCat,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }))

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value)

  return myNodes
}

export const fillColor = d3.scaleOrdinal().domain(["Start-up", "Performers", "Trenders"]).range(['#aaa939', '#2c4870', '#9c344c']);


var json_data;
var dropdown = d3.select("#selDataset")
d3.json("./samples.json").then(function (data) {
    json_data = data
    console.log(json_data)
    json_data.names.forEach(element => {
        // console.log(element)
        dropdown.append("option").text(element)
    });
})

init()
function init() {
    d3.json("./samples.json").then(function (data) {
        json_data = data
    var input = 940
    var metadata = json_data.metadata.filter(element => element.id == input)[0]
    console.log(metadata)
    var samples = json_data.samples.filter(element => element.id == input)[0]
    console.log(samples)

    var panelData = d3.select("#sample-metadata");
    panelData.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panelData.append("p").text(`${key}: ${value}`)
    });

    var otu_ids = samples.otu_ids;
    var otu_labels = samples.otu_labels;
    var sample_values = samples.sample_values;
    var formatBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
    };
    var dataBubble = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            color: otu_ids,
            size: sample_values,
        }
    }]
    Plotly.newPlot("bubble", dataBubble, formatBubble);
    var bar_data =[
        {
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x: sample_values.slice(0,10).reverse(),
          text: otu_labels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
        }
    ];
    var barFormat = {
        title: "Top OTUs Found ",
        margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", bar_data, barFormat);
});
}

function optionChanged(input) {
    var metadata = json_data.metadata.filter(element => element.id == input)[0]
    console.log(metadata)
    var samples = json_data.samples.filter(element => element.id == input)[0]
    console.log(samples)

    var panelData = d3.select("#sample-metadata");
    panelData.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panelData.append("p").text(`${key}: ${value}`)
    });

    var otu_ids = samples.otu_ids;
    var otu_labels = samples.otu_labels;
    var sample_values = samples.sample_values;
    var formatBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
    };
    var dataBubble = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            color: otu_ids,
            size: sample_values,
        }
    }]
    Plotly.newPlot("bubble", dataBubble, formatBubble);
    var bar_data =[
        {
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x: sample_values.slice(0,10).reverse(),
          text: otu_labels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
        }
    ];
    var barFormat = {
        title: "Top OTUs Found ",
        margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", bar_data, barFormat);
}

// GRAPHS BELOW



function init(){
    let selector = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let names = data.names;
        for (let i = 0; i < names.length; i++){
            selector.append("option").text(names[i]).property("value", names[i]);
        }
        let firstSample = names[0];
        charts(firstSample);
        metadata(firstSample);
    })
}

function charts(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
        let result = resultArray[0];
        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;
        let bubbleLayout = {
            margin: {t: 0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };
        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: "YlGnBu"
                }
            }
        ]
        Plotly.newPlot("bubble", bubbleData, bubbleLayout)

        let barData = [
            {
                x: sampleValues.slice(0, 10).reverse(),
                y: otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                text: otuLabels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        let barLayout = {
            margin: {t: 0, l: 100}
        }
        Plotly.newPlot("bar", barData, barLayout)
    });
}

function metadata(sample){

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);
        let result = resultArray[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        for(key in result){
            panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
        }
        buildGauge(result.wfreq);
    })
}

function optionChanged(nextSample){
    charts(nextSample);
    metadata(nextSample);
}

init();
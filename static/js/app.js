function init(){
    let selector = d3.select("#selDataset");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let names = data.names;
        for (let i = 0; i < names.length; i++){
            selector.append("option").text(names[i]).property("value", names[i]);
        }
        let firstSample = names[0];
        chart(firstSample);
        metadata(firstSample);
    })
}

function chart(sample){
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
        let result = resultArray[0];
        let otuIDs = result.otu_ids;
        let otuLabels = result.otu_labels;
        let sampleValues = result.sample_values;
        let bubbleLayout = {
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
                    colorscale: "Earth"
                }

            }
        ]
        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
}

function metadata(){

}

init();
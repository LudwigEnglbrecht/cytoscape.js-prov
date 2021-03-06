# cytoscape.js-prov_nodejs: W3C-Prov to Cytoscape network (native)

This extension transforms W3C-Prov (generated by [Camflow](http://camflow.org/)) to a Cytoscape network (JSON) using cytoscape.js-prov and NodeJS. **It is important to note that this project merely creates a cytoscape network for further processing and builds on the cytoscape.js-prov project.**

## Architecture 
Within the scope of this implementation, a program was created, which integrated the prototype cytoscape.js-prov into a Node.js environment. The following figure illustrates how provenance data is transformed to a cytoscape network using (cytoscape.js-prov).

![](architecture_1.png?raw=true) 

To achieve the transformation the structure of the source code of cytoscape.js-prov was analyzed. Thereby it was possible to select the functionalities that are important for the integrated design from the source code into the new architecture. Since a large part of the code of the prototype was used for the visualization of the provenance graphs, the program code has been shortened. A visual representation is not provided in this version.

### Workflow of the transformation

The workflow of this extension is as follows:

- System 1 and/or System 2 are using Camflow and are configured to publish provenance-data via MQTT to a message broker. This is illustrated as (a) in the figure above. 

- Since the provenance-data is published as a base64 string we added the NodeJS script “msg_converter.js” to the workflow. This script subscribes to a provenance topic (e.g.: /camflow/provenance/1) to receive the provenance-data of a system, converts it to a valid JSON-String and publish it at another topic (e.g.: /converted/1). This step is show in the above figure as (b).

- The bash script “mqttToMongo” (see (c) in the figure above) starts **mosquitto_sub** (a simple MQTT client) that subscribes to the topic containing the valid JSON-string of the provenance data (e.g.: /converted/1). This bash script also uses the tool **mongoimport** to continuously import every JSON object into a MongoDB collection.

- The NodeJS script “integration.js” connects to a MongoDB, loads **all** data from a collection and builds a network using cytoscape.js. 

- After the network has been fully loaded it is saved as a network (e) that is useable for the Desktop-Version of Cytoscape. This enables a feature-rich analysis of the provenance graph in Cytoscape.



## Install

Install Mongo tools to be able to use the Mongo import:
```
sudo apt install mongo-tools
```

Install NodeJS to load data from a MongoDB and perform the transformation:
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

Install necessary packages for the NodeJS environment:
```
npm install async --save
npm install jsdom --save
npm install jquery --save
npm install cytoscape --save
npm install cytoscape-dagre --save
npm install mongodb --save
```

Clone the project:
```
git clone https://github.com/LudwigEnglbrecht/cytoscape.js-prov_nodejs
```

Edit the connection details according to your MongoDB database and specify your query:
```
cd cytoscape.js-prov_nodejs
nano integration.js
```

## Usage

It is assumed that your provenacne data (from [Camflow](http://camflow.org/)) is published to a MQTT Message Broker.

The following command subscribes to a topic and sends every entry to a Mongo DB collection:
```
sh mqttToMongo
```


To load all data from a MongoDB collection and save the cytoscype network in "./networks/cyto_network_TIMESTAMP.json" run the following command:
```
node --max-old-space-size=6096   --no-force-async-hooks-checks integration.js
```

# Used in the following research projects

- [Enhancing credibility of digital evidence through provenance-based incident response handling (2019)](https://www.researchgate.net/publication/334331057_Enhancing_credibility_of_digital_evidence_through_provenance-based_incident_response_handling?_sg=FHOPZtzk5nYTzxzCyZHNG1RVBXvlwfLiCA7nnPG5taCiGzwn7eUtNPClCaBxlSc1Q3JZuYhsjcTQpBaSLmdfEnEcK665WXGkGAJ04Fjh.rUu_IDPn8mDQVFybh95MZOP38Y4M_NRVaqhfgs8dTPYeiDEdVMqFEAFVyq3_dYIwzaVGIxu4sCzf6GMEW27OaQ)


# Next steps

* Incorporate "CamFlow/cytoscape.js-prov" as a sub-module to benefit from further developments

# Authors of this extension

- Philipp Schwabenbauer
- Philipp Meinlschmidt
- Ludwig Englbrecht

Feel free to contact Mr. Ludwig Englbrecht via ludwig.englbrecht@wiwi.uni-regensburg.de for improvements or questions.

# About the project

This project deals with purpose-specific extensions of existing data-provenance software and was developed as part of a bachelor thesis at the University of Regensburg, Chair of Information Systems (Prof. Dr. Günther Pernul), [(https://www.uni-regensburg.de/wirtschaftswissenschaften/wi-pernul/)](https://www.uni-regensburg.de/wirtschaftswissenschaften/wi-pernul/) under the supervision of [Mr. Ludwig Englbrecht](https://www.researchgate.net/profile/Ludwig_Englbrecht) during his Ph.D. Research Project. The software is intended for educational and academic use. 

# cytoscape.js-prov_nodejs: W3C-Prov to Cytoscape network (native)

This extension transforms W3C-Prov (generated by [Camflow](http://camflow.org/)) to a Cytoscape network (JSON) using cytoscape.js-prov and NodeJS. 

## Architecture
Within the scope of this implementation, a program was created, which integrated the prototype cytoscape.js-prov into a Node.js environment. The following figure illustrates how provenance data is transformed to a cytoscape network using (cytoscape.js-prov).

![](architecture_1.png?raw=true)

To achieve this the structure of the source code was analyzed and the important functionalities for the integrated application. Thereby it was possible to select the functionalities important for the integrated design from the source code into the new program. Since a large part of the code of the prototype was used for the visualization of the provenance graphs, the program code could be shortened and made clearer. A visual representation is not provided in this version.


## Install

Install Mongo tools to be able to use the Mongo import:
```
sudo apt install mongo-tools
```

## Usage

It is assumed that your provenacne data (from [Camflow](http://camflow.org/)) is published to a MQTT Message Broker.

The following command subscribes to a topic and sends every entry to a Mongo DB collection
```
sh mqttToMongo
```


Load all data from a MongoDB collection and save the cytoscype network in "./networks/cyto_network_TIMESTAMP.json"
```
node integration.js
```

# Used in the following research projects

- [Enhancing credibility of digital evidence through provenance-based incident response handling (2019)](https://www.researchgate.net/publication/334331057_Enhancing_credibility_of_digital_evidence_through_provenance-based_incident_response_handling?_sg=FHOPZtzk5nYTzxzCyZHNG1RVBXvlwfLiCA7nnPG5taCiGzwn7eUtNPClCaBxlSc1Q3JZuYhsjcTQpBaSLmdfEnEcK665WXGkGAJ04Fjh.rUu_IDPn8mDQVFybh95MZOP38Y4M_NRVaqhfgs8dTPYeiDEdVMqFEAFVyq3_dYIwzaVGIxu4sCzf6GMEW27OaQ)


# Next steps

* Add "CamFlow/cytoscape.js-prov" as a sub-module to benefit from further developments
* Address performance issues during the network parsing in node.js

# Authors of this extension

- Philipp Schwabenbauer
- Ludwig Englbrecht

Feel free to contact Mr. Ludwig Englbrecht via ludwig.englbrecht@wiwi.uni-regensburg.de for improvements or questions.

# About the project

This project deals with purpose-specific extensions of existing data-provenance software and was developed as part of a bachelor thesis at the University of Regensburg, Chair of Information Systems (Prof. Dr. Günther Pernul), [(https://www.uni-regensburg.de/wirtschaftswissenschaften/wi-pernul/)](https://www.uni-regensburg.de/wirtschaftswissenschaften/wi-pernul/) under the supervision of [Mr. Ludwig Englbrecht](https://www.researchgate.net/profile/Ludwig_Englbrecht) during his Ph.D. Research Project. The software is intended for educational and academic use. 

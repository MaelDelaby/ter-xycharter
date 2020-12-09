CREATE TABLE GraphType(
                          idGraphType  SERIAL PRIMARY KEY,
                          graphType  VARCHAR(20),
                          serviceName VARCHAR(40)
);

CREATE TABLE Graphs (
                        idGraph SERIAL PRIMARY KEY,
                        name varchar(20) NOT NULL,
                        description text NOT NULL,
                        creationDate timestamp,
                        idGraphType int NOT NULL,
                        characteristics text NOT NULL,

                        CONSTRAINT fk_graphType
                            FOREIGN KEY (idGraphType) REFERENCES GraphType(idGraphType)
);

CREATE TABLE DataSets (
    idDataset SERIAL PRIMARY KEY,
    name varchar(20) NOT NULL,
    description text NOT NULL,
    creationDate timestamp,
    timeseries BOOLEAN,
    DataJSON TEXT

);

CREATE TABLE LinkDataSetGraph (
    idGraph int NOT NULL,
    idDataset int NOT NULL,

    PRIMARY KEY(idDataset, idGraph),
    CONSTRAINT fk_dataSet
      FOREIGN KEY(idDataset)
          REFERENCES DataSets(idDataset),
    CONSTRAINT fk_graph
      FOREIGN KEY(idGraph)
          REFERENCES Graphs(idGraph)
);

<<<<<<< HEAD
INSERT INTO graphtype (graphtype,serviceName) VALUES ('histogramme', 'XYCharter');
INSERT INTO graphtype (graphtype,serviceName) VALUES ('connectedLine', 'XYCharter');
INSERT INTO graphtype (graphtype,serviceName) VALUES ('doughnut', 'QuickChart');
=======
INSERT INTO graphtype (graphtype) VALUES ('histogramme');
INSERT INTO graphtype (graphtype) VALUES ('connectedLine');
INSERT INTO graphtype (graphtype) VALUES ('circlePoint');
INSERT INTO graphtype (graphtype) VALUES ('bezierCurve');
>>>>>>> dev

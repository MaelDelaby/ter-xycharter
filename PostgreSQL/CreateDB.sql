CREATE TABLE GraphType(
                          idGraphType  SERIAL PRIMARY KEY,
                          graphType  VARCHAR(20)
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

INSERT INTO graphtype (graphtype) VALUES ('histogramme');
INSERT INTO graphtype (graphtype) VALUES ('connectedLine');
INSERT INTO graphtype (graphtype) VALUES ('circlePoint');
INSERT INTO graphtype (graphtype) VALUES ('bezierCurve');
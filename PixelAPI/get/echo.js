/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

To żądanie zwraca wszystkie parametry wejściowe WŁĄCZNIE Z TOKENEM
*/

exports.path = "/echo";

exports.execute = (req, res) => {
    res.send(JSON.stringify(req.query));
};
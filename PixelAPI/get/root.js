/*
  ___ _   _ _____ ___  
 |_ _| \ | |  ___/ _ \ 
  | ||  \| | |_ | | | |
  | || |\  |  _|| |_| |
 |___|_| \_|_|   \___/

To żądanie robi nic
*/

exports.path = "/";

exports.execute = (req, res) => {
res.send({ok: true})
};
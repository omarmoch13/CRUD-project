const dbQueries = require('../Queries.js');

const getData = async (req, res) => {
    const getAllRows = `select * from workout`;
    try {
      const { 
        rows
      } = await dbQueries(getAllRows);
      const dbResponse = rows;
      if (dbResponse[0] === undefined) {
        res.send('no files')
      }
      res.send(dbResponse)
    } catch (error) {
      if (error) {
        res.send('error ' + error.code);
        return;
      }
    } 
  }

const addData = async (req, res) => {
  const id = (req.body.id);
  const hari = (req.body.hari);
  const olahraga1 = (req.body.olahraga1);
  const olahraga2 = (req.body.olahraga2);
  const olahraga3 = (req.body.olahraga3);
  const olahraga4 = (req.body.olahraga4);
  const getAllRows = 'INSERT INTO workout (id, hari, olahraga1, olahraga2, olahraga3, olahraga4) VALUES (DEFAULT, $1, $2, $3, $4, $5)';
  try {
    const {
      rows
    } = await dbQueries(getAllRows, [hari, olahraga1, olahraga2, olahraga3, olahraga4]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      res.send('Sukses')
    }
    res.send(dbResponse)
  } catch (error) {
    if (error) {
      res.send('error ' + error.code);
      return;
    }
  }
}

const updateData = async (req, res) => {
  const id = (req.body.id);
    const hari = (req.body.hari);
    const olahraga1 = (req.body.olahraga1);
    const olahraga2 = (req.body.olahraga2);
    const olahraga3 = (req.body.olahraga3);
    const olahraga4 = (req.body.olahraga4)
  const getAllRows = `Update workout set olahraga3=$3, olahraga4 =$4 where olahraga1=$1 and olahraga2=$2`;
  try {
    const {
      rows
    } = await dbQueries(getAllRows, [ hari, olahraga1, olahraga2, olahraga3, olahraga4] );
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      res.send('Sukses')
    }
    res.send(dbResponse)
  } catch (error) {
    if (error) {
      res.send('error ' + error.code);
      return;
    }
  } 
}

const deleteData = async (req, res) => {
    const id= (req.params.id)
  const getAllRows = `delete from workout where id=$1`;
  try {
    const {
      rows
    } = await dbQueries(getAllRows, [id]) ;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      res.send('Sukses')
    }
    res.send(dbResponse)
  } catch (error) {
    if (error) {
      res.send('error ' + error.code);
      return;
    }
  } 
}


module.exports = {
  getData,
  addData,
  updateData,
  deleteData
}
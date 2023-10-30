function cariLantai(nomorLoker) {
    let lantai = 1;
    let lokerPerLantai = 5;
  
    while (nomorLoker > lokerPerLantai) {
      nomorLoker -= lokerPerLantai;
      lantai++;
      lokerPerLantai++;
    }
  
    return lantai;
  }

  const nomorLoker = 20
  
  console.log(cariLantai(nomorLoker));
  
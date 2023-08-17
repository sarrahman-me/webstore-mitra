const HitungKeramik = (
  kategoriBarang: string,
  panjang: number,
  lebar: number
) => {
  let diameter_ruang = panjang * lebar;
  let kebutuhan = diameter_ruang;
  let diameter_perdus = 1;

  switch (kategoriBarang) {
    case "Granit":
      diameter_perdus = 1.44;
      kebutuhan = Math.ceil(diameter_ruang / diameter_perdus);
      break;
    default:
      break;
  }

  return {
    diameter_ruang,
    kebutuhan,
    diameter_perdus,
  };
};

export default HitungKeramik;

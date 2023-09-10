const HitungKeramik = (
  ukuranBarang: string,
  panjang: number,
  lebar: number
) => {
  let diameter_ruang = panjang * lebar;
  let kebutuhan = diameter_ruang;
  let diameter_perdus = 1;

  // Objek yang berisi informasi ukuran keramik dan isi per dus
  const ukuranKeramikInfo = {
    "25x25": 16,
    "30x30": 11,
    "40x40": 6,
    "50x50": 4,
    "60x60": 4,
    "20x40": 12,
    "25x40": 10,
    "25x50": 8,
    "30x60": 6,
    // Tambahkan ukuran keramik dan isi per dus yang lain di sini
  } as any;

  // Periksa apakah ukuranBarang ada dalam objek ukuranKeramikInfo
  if (ukuranBarang in ukuranKeramikInfo) {
    diameter_perdus =
      (parseInt(ukuranBarang.split("x")[0]) / 100) *
      (parseInt(ukuranBarang.split("x")[1]) / 100) *
      ukuranKeramikInfo[ukuranBarang];
    kebutuhan = Math.ceil(diameter_ruang / diameter_perdus);
  } else {
    // Handle jika ukuranBarang tidak ditemukan
    console.error("Ukuran keramik tidak valid.");
  }

  return {
    diameter_ruang,
    kebutuhan,
    diameter_perdus,
  };
};

export default HitungKeramik;

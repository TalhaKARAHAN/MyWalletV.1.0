module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,  // Hangi değişkenler yüklenmeyecekse buraya eklenebilir
          allowlist: null,  // Sadece izin verilen değişkenleri yüklemek için kullanılır
          safe: false,      // Eğer false ise eksik değişkenlerde hata vermez
          allowUndefined: true, // Undefined değişkenleri yüklemeye izin verir
          verbose: false,   // Detaylı loglama yapılmaz (isteğe bağlı true yapılabilir)
        },
      ],
    ],
  };
};

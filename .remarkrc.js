// .remarkrc.js
exports.plugins = [
  [
    "remark-retext",
    require("unified")().use({
      plugins: [
        [require("retext-contractions"), { straight: true }],
        require("retext-english"),
        require("retext-indefinite-article"),
        require("retext-repeated-words"),
        require("retext-syntax-urls"),
        [
          require("retext-spell"), 
            { 
              dictionary: require("dictionary-en-us"), 
              personal: require("./dictionary/local.dic").join('\n')
            }
        ]
      ]
    })
  ],
  "remark-preset-lint-consistent",
  "remark-preset-lint-recommended",
  ["remark-lint-list-item-indent", "space"]
];

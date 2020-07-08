/* +++++++++++++++++++++++++++++++ Условие задания +++++++++++++++++++++++++++++++ 
Есть массив с тегами и значениями тегов.
Пример: ["h2@Привет, Мир!", "span@Куку", "p@lorem ipsum dollar.", "a@Ссылка на инстаграм"]
Разделителем между тегом и значением выступает символ @
Нужно создать новый массив с преобразованными HTMl-тегами:
Пример: ["<h2>Привет, Мир!</h2>", "<span>Куку</span>", "<p>lorem ipsum dollar.</p>", "<a>Ссылка на инстаграм</a>"]
После преобразования, заменить значения в старом массиве и очистить новый.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

const arrTagsConversion = function (arr, separator = "@") {
  if (!Array.isArray(arr)) {
    return;
  }
  const result = [];
  const tempArray = [];
  let element;
  for (element of arr) {
    if (element.indexOf(separator) !== -1) {
      let tempArray = element.split(separator);
      result.push(`<${tempArray[0]}>${tempArray[1]}</${tempArray[0]}>`);
    }
  }
  return result;
};

let allTags = ["h2@Привет, Мир!", "span@Куку", "p@lorem ipsum dollar.", "a@Ссылка на инстаграм"];
let convertTags = arrTagsConversion(allTags);
allTags = convertTags;
convertTags = [];
console.log(allTags);

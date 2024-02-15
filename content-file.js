console.info("> folder 1");
console.info("> sub folder 1");
console.info("> folder 2");
console.log("> ", [1, 2, 3, 4, 5]);
//Muestra por pantalla el número de ficheros y directorios que hay en el árbol (No cuentes el fichero README.md)

const { readdirSync, statSync, readFileSync, appendFileSync } = require("fs");

//fs.readdirSync : Reads the contents of the directory
//fs.statSync: stats.isDirectory()

const myDirectory =
  "/Users/cristina/documents/thebridge/ejercicio-fs-recursividad/";

const excludeFileFromList = (list) =>
  list.filter((e) => !e.includes("README.md") && !e.includes(".git"));

const filesAndDirSum = (dir, result = 0) => {
  const list = excludeFileFromList(readdirSync(dir));
  console.log(list);
  ["f1", "f2", "f3", "index.js"];

  result += list.length; // 0 + 4
  console.log(result); //4

  for (const element of list) {
    const newPath = `${dir}${element}`;
    const stats = statSync(newPath);

    if (stats.isDirectory()) {
      result += filesAndDirSum(`${newPath}/`);
    } else {
      result += 0; //this ends here (no files inside)
    }
  }
  return result;
};

console.info(
  "> number of files and directories: ",
  filesAndDirSum(myDirectory)
);

//Muestra por pantalla el número total de ficheros en todo el árbol (No cuentes el fichero README.md)

const filesSum = (dir, result = 0) => {
  const list = excludeFileFromList(readdirSync(dir));
  console.log(list);
  ["f1", "f2", "f3", "index.js"];

  for (const element of list) {
    const newPath = `${dir}${element}`;
    const stats = statSync(newPath);

    if (!stats.isDirectory()) {
      result += 1;
    } else {
      result += filesAndDirSum(`${newPath}/`);
    }
  }

  return result;
};

console.info("> number of files: ", filesSum(myDirectory));

//Muestra por pantalla bytes totales de sumar el peso de todos los ficheros del árbol (No cuentes el fichero README.md)

const totalFilesSize = (dir, result = 0) => {
  const list = excludeFileFromList(readdirSync(dir));
  ["f1", "f2", "f3", "index.js"];

  for (const element of list) {
    const newPath = `${dir}${element}`;
    const stats = statSync(newPath);

    if (!stats.isDirectory()) {
      result += stats.size;
    } else {
      result += totalFilesSize(`${newPath}/`);
    }
  }
  return result;
};

console.info("> total files size: ", `${totalFilesSize(myDirectory)} bytes`);
//2351 bytes

//Crea, en la raíz, un fichero .js (ponle el nombre que quieras), que tenga todas las líneas de todos los js que haya en el árbol (No cuentes el fichero README.md)

const appendIntoNewFile = (dir) => {
  const list = excludeFileFromList(readdirSync(dir));
  ["f1", "f2", "f3", "index.js"];

  for (const element of list) {
    const newPath = `${dir}${element}`;
    const stats = statSync(newPath);

    if (!stats.isDirectory()) {
      const fileContent = readFileSync(newPath).toString();
      console.log(fileContent);
      appendFileSync("./content-file.js", fileContent);
    } else {
      appendIntoNewFile(`${newPath}/`);
    }
  }
};

appendIntoNewFile(myDirectory);

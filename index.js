//Muestra por pantalla el número de ficheros y directorios que hay en el árbol (No cuentes el fichero README.md)

const { readdirSync, statSync } = require("fs");

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

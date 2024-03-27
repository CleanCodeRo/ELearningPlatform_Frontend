
import XlsxPopulate from 'xlsx-populate';

const getKataLinks = async () => {
    let data = []
    try {
        const workbook = await XlsxPopulate.fromFileAsync('./kataLinks.xlsx');
        const sheet = workbook.sheet(0);
        data = await sheet.usedRange().value();
          console.log("Links length ", data.length)
    } catch (error) {
        console.error("Error:", error);
    }
    return data;
}

const saveAllKatasToDB = (katas) =>{
    console.log(typeof katas, katas.length)
    fetch("http://localhost:8080/katas/savePopulateKatas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(katas),
    })
        .then(() => {
          console.log("Kata populate succesfully!")
        })
        .catch((error) => {
            console.log(error)
        })
}

const listAllTags = (katas) =>{
    let tags = katas.map(kata => kata.category).join(",").split(",").filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    console.log("Here all the categories to update if needed")
    console.log("___________________________________________________")

    tags.forEach((tag) =>console.log(`"${tag}",`))

    console.log("___________________________________________________")
}

const populateKatas = async () => {
    try {
        const kataLinks = await getKataLinks();
        let fullKatas = []
        let i = 0;
        let id;

        const fetchData = (i) => {
            console.log(i, " / ", kataLinks.length)
            if (i == kataLinks.length) {
                listAllTags(fullKatas)
                saveAllKatasToDB(fullKatas);
                return;
            }
            id = kataLinks[i][0].split("/").splice(4, 1).join("");
            fetch(`https://www.codewars.com/api/v1/code-challenges/${id}`)
                .then(res => res.json())
                .then(data => {
                    fullKatas.push({
                        title : data.name,
                        kataLink : data.url,
                        level : data.rank.name.split(" ")[0],
                        category : data.tags.map(tag => tag.toUpperCase())
                    })
                    setTimeout(() => {
                        fetchData(i + 1)
                    }, 100)
                })
                .catch(err => console.log(err))
        }

        fetchData(i);
    } catch (error) {
        console.error("Error:", error);
    }
};
populateKatas()
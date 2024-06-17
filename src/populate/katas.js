
import XlsxPopulate from 'xlsx-populate';

// Use this populate script if you add a increased ammout of katas, if you want to add a few use the iterface provided, else add in the populate
// folder the file with all the kataLinks that you want in db, with the old ones, the DB will be completly refreshed with the old ones and the new katas that you added in 
// the new file
// Again Steps if you want to add new katas with populate
//    Take the kataLinks file from the project and the katas links that you want to add and introduce them in the file, 
//    then enter in terminal in the populate folder and run "node katas.js", after take the new categories
//    and put them in the category object, make sure you dont delete the first option "ALL"

// PS : due to security you need to put in the fetch of function saveAllKatasToDB a new token that has admin propertyes
// for the post to complete

// COMPLETE IN THE AUTH SECTION A VALID TOKEN WITH ADMIN PROPS

const getKataLinks = async () => {
    let data = []
    try {
        const workbook = await XlsxPopulate.fromFileAsync('./KataLinks1.xlsx'); // here change the name of the file if you add another file with aother name
        const sheet = workbook.sheet(0);
        data = await sheet.usedRange().value().filter((value, index, self) => {
            // Convert each inner array to a string for comparison
            let stringValue = value[0];
            // Check if the current string is the first occurrence in the array
            return self.findIndex(arr => arr[0] === stringValue) === index;
          });  // with this filter i remove the doubles if exist 
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
            //put a VALID USER TOKEN HERE
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbGlAIiwiaWQiOjEsImZpcnN0TmFtZSI6Im9saSIsImxhc3ROYW1lIjoib2xpIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzE4NjE0MzQzLCJleHAiOjE3MTk4MjM5NDN9.L93ipCAijJkp8LZMZPZYr_eK1tX2peiYeLNz0P81p0s`,
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
/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 

/** Positive test input object */
const twentyLeaguesInPositive = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Negative test input object */
const twentyLeaguesInNegative = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum. dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was profound; and however good Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]


/** Case sensitive input object */
const twentyLeaguesInCase = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Positive output object */
const twentyLeaguesOutPositive = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Negative output object */
const twentyLeaguesOutNegative = {
    "SearchTerm": "the",
    "Results": [
    ]
}

/** Case sensitive output object */
const twentyLeaguesOutCase = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}


/** The Search Function*/
function findSearchTermInBooks(searchTerm, scannedTextObj) {

    const result = {
        "SearchTerm": "",
        "Results": []
    };


    result.SearchTerm = searchTerm /** Adds the search term to result object*/

    if (searchTerm != "" ) { /** Program initiates iff the search term is a non-empty string*/

        for (let i = 0; i < scannedTextObj.length; i++) { /** Iterates through the books in the object */

            if (scannedTextObj[i].Content.length > 0) { /** Continutes if the Content object is non-empty */

                for (let j = 0; j < scannedTextObj[i].Content.length; j++) { /** iterates through the contents given a book*/

                    if (scannedTextObj[i].Content[j].Text.includes(searchTerm)) { /** If the term exist in the text, the calls the addResult helper function */
                        addResult(result, scannedTextObj, i, j);
                    }
                }

            }

        }

    }
    return result;
}
/** Helper void function that adds the ISBN, Page No. and Line to the result object*/
function addResult(result, scannedTextObj, i, j){
    result.Results.push({
        ISBN: scannedTextObj[i].ISBN, 
        Page: scannedTextObj[i].Content[j].Page,
        Line: scannedTextObj[i].Content[j].Line
    });
}

//console.log(findSearchTermInBooks("the",twentyLeaguesInPositive))


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/** Test that return a match */
const test1result = findSearchTermInBooks("the", twentyLeaguesInPositive); 
if (JSON.stringify(test1result) == JSON.stringify(twentyLeaguesOutPositive)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOutPositive);
    console.log("Received:", test1result);
}

/** Test that does not return a match */
const test2result = findSearchTermInBooks("the", twentyLeaguesInNegative); 
if (JSON.stringify(test2result) == JSON.stringify(twentyLeaguesOutNegative)) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOutNegative);
    console.log("Received:", test2result);
}

/** Test that checks case sensitivity */
const test3result = findSearchTermInBooks("The", twentyLeaguesInCase); 
if (JSON.stringify(test3result) == JSON.stringify(twentyLeaguesOutCase)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOutCase);
    console.log("Received:", test3result);
}




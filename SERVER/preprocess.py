from snowballstemmer import NepaliStemmer
from tqdm.auto import tqdm

def preprocess_text(cat_data,stop_words,punctuation_words):
    progress_bar = tqdm(range(len(cat_data)))
    stemmer = NepaliStemmer() # initialize the Nepali stemmer

    new_cat = []
    category_data=[]
    noise = "1,2,3,4,5,6,7,8,9,0,०,१,२,३,४,५,६,७,८,९".split(",")

    for i in range(len(cat_data)):
        row=cat_data[i]
        # print(f'row before: {row}')
        for punc in punctuation_words:
            row = row.replace(punc, "")
        # print(f'row after: {row}')
        words = row.strip().split(" ")
        nwords = ""

        for word in words:
            # apply Nepali stemming to the word
            if word not in punctuation_words and word not in stop_words:
                word = stemmer.stemWord(word)

                is_noise = False
                for n in noise:
                    if n in word:
                        is_noise = True
                        break
                if not is_noise and len(word) > 1:
                    word = word.replace("(","")
                    word = word.replace(")","")
                    nwords += word + " "

        new_cat.append(nwords.strip())
        progress_bar.update(1)

    # dff = pd.DataFrame({'preprocessed_text': new_cat,'category': category_data })
    # dff.to_csv('D:/Major Project/3000_output_data/preprocessed_data_3000.csv', index=False)
    
    progress_bar.close()

    return new_cat


# title_clean = preprocess_text(["\nसगरमाथा चुचुरोमा पुग्ने ९ शेर्पा टोलीको नेतृत्व लेख्नु चाहनुहुन्छ गरेको छ।"],"education")
# print(title_clean)
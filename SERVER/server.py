# -*- coding: utf-8 -*-

from flask import Flask,request,jsonify
from transformers import BertTokenizer, BertForSequenceClassification
import torch
from transformers import AutoTokenizer,AutoModelForTextEncoding, BertTokenizer, BertModel, AutoModelForMaskedLM, AutoModel, AutoModelForSequenceClassification

model_path = '../MODEL/nepaliBERT_finetuned_model_final'
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)




#labeling the category
label_to_category = {
    0: "Education",
    1: "World",
    2: "Sports",
    3: "Technology",
    4: "Crime",
    5: "Health",
    6: "Market",
    7: "Politics",
    8: "Automobile",
    9: "Tourism",
    10: "Literature",
    11: "Entertainment",
    12: "Business"
}

app=Flask(__name__)

model.eval()

@app.route('/classifynews', methods=['POST'])

def predict_news_category():

    text=request.form.getlist('news')
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)

    # Get the model predictions
    with torch.no_grad():
        outputs = model(**inputs)

    # Get the predicted class index
    predicted_class_indices = torch.argmax(outputs.logits, dim=1).tolist()

    # Get the predicted class label
    predicted_class_labels = [label_to_category[idx] for idx in predicted_class_indices]


    return jsonify({'predictions': predicted_class_labels})


if __name__ == "__main__":
    print("Starting Python Flask Server..")
   
    # a=predict_news_category('विश्व स्वास्थ्य सङ्गठन (डब्ल्यूएचओ) का एक प्रमुख अधिकारीले यूरोपमा श्वासप्रश्वाससम्बन्धी रोगका बढ्दो घटनालाई मध्यनजर गर्दै सतर्कता अपनाउन आग्रह गरेका छन् ।  डब्ल्यूएचओका यूरोप क्षेत्रीय निर्देशक हान्स हेनरी पी क्लुजले कोपनहेगनमा आयोजित पत्रकार सम्मेलनमा इन्फ्लुएन्जाको सङ्क्रमण र अस्पताल भर्ना हुनेको सङ्ख्यामा वृद्धि भएको उल्लेख गर्दै आगामी हप्ताहरूमा सम्भावित वृद्धिको सामनाका लागि तयारी गर्न अस्पताल तथा स्वास्थ्य केन्द्रसहित सम्वद्ध सङ्घसंस्थालाई आग्रह गरे ।')
    # print(a)
    # b=predict_news_category('अमेरिकी पूर्वराष्ट्रपति बाराक ओबामाकी यी जेठी छोरीले छोटो फिल्म ‘द हार्ट’ निर्देशन गर्दै फिल्ममा डेब्यु गरेकी छन् । उनी निर्देशित फिल्म यस वर्षको सनडान्स फेस्टिभलमा प्रिमियर हुँदैछ । फेस्टिभलको रेडकार्पेटमा मालिया पनि देखा परिन् । उनले यो फिल्मलाई अनौठो सानो कथा र केही हदसम्म दन्त्यकथाको रुपमा वर्णन गरेकी छन् ।')
    # print(b)
    # c=predict_news_category('काठमाडौं । नयनतारा अभिनित तमिल फिल्म ‘अन्नपूर्णी’ यतिबेला विवादले घेरिएको छ । फिल्मले हिन्दु धर्मावलम्बीको भावनामा चोट पुर्‍याएको भन्दै आलोचना चर्किएपछि नेटफ्लिक्सले फिल्म हटाइसकेको छ । यो विवादमा अभिनेत्री नयनताराले पनि माफी मागेकी छिन् । सामाजिक सञ्जालमा जय श्रीरामबाट सुरु भएको आफ्नो माफी पत्रमा नयनताराले लेखेकी छन्, ‘जय श्रीराम, मेरो फिल्म अन्नपूर्णीसँग सम्बन्धित विषयमा प्रकाश पार्न भारी हृदयहसहित यो नोट लेख्दैछु । फिल्म अन्नपूर्णी सिनेम्याटिक प्रयास मात्र होइन, कहिल्यै हार नमान्ने हृदयस्पर्शी र प्रेरणादायी कथा हो । सकारात्मक सन्देश साझा गर्ने प्रयासमा हामीले अञ्जानमा मानिसलाई चोट पुर्‍याएको हुनसक्छ । सेन्सर भएर हलमा रिलिज भइसकेको फिल्मलाई ओटीटीबाट हटाइनेछ भनेर मैले सोचेको थिइनँ ।’')
    # print(c)
    # d=predict_news_category('८ माघ, काठमाडौं । दोस्रो बजारमा कारोबार सुरु भएपछि हिमालयन रिइन्स्योरेन्स कम्पनीको सेयर मूल्यमा पहिलो पटक ‘रेड क्यान्डिलस्टिक’ बनेको छ । सेयर मूल्य अघिल्लो दिनको तुलनामा प्रतिकित्ता ३५ रुपैयाँ घटेपछि ‘रेड क्यान्डिलस्टिक’ बनेको हो । सोमबार यस कम्पनीको मूल्य ५.१४ प्रतिशत घटेको हो । दिनभर कारोबार हुँदा मूल्य उतारचढाव भए पनि अघिल्लो दिनको क्लोजिङ प्राइस भेटाउन सकेन । अघिल्लो दिन प्रतिकित्ता ६८१ रुपैयाँ क्लोजिङ प्राइस थियो । तर सोमबार कारोबार हुँदा अधिकतम मूल्य ६७५ रुपैयाँसम्म मात्रै पुग्यो भने न्यूनतम ६४१ रुपैयाँसम्म झरेको थियो । दिनभर कारोबार हुँदा ३४ रुपैयाँसम्म कम्पनीको मूल्य उतारचढाव हुन पुग्यो ।')
    # print(d)
    app.run()


    



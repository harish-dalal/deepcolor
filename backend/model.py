from tensorflow.keras.models import load_model
# savedModel=load_model('/media/harish/New Volume/stuff/deepcolor/backend/colorization_model/1')
savedModel = load_model('./colorization_model/1')
savedModel.summary()
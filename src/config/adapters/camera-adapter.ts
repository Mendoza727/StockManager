import { launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

export class CameraAdapter {
  static async takePicture(): Promise<string[]> {
    try {
      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images", "livePhotos"],
        quality: 0.7,
        allowsEditing: false,
        aspect: [4, 3],
      });

      if (!response.canceled && response.assets[0].uri) {
        return [response.assets[0].uri];
      }

      return [];
    } catch (error) {
      console.error("Error al tomar la foto: ", error);
      throw new Error(`Error getting camera ${error}`);
    }
  }

  static async getPictureFromLibrary(): Promise<string[]> {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: false,
        allowsMultipleSelection: true,
        aspect: [4, 3],
      });

      if (!response.canceled && response.assets.length > 0) {
        return response.assets
          .map((asset) => asset.uri!)
          .filter((asset) => asset !== undefined);
      }

      return [];
    } catch (error) {
      throw new Error(`Error getting photos in library ${error}`);
    }
  }
}

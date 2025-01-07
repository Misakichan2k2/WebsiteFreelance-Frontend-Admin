import translation from "./translation";

export const FORMAT = {
  formatDate: (dateString) => {
    const date = new Date(dateString);

    // Lấy ngày, tháng, và năm
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = String(date.getFullYear()).slice(); // Lấy hai chữ số cuối của năm

    // Định dạng theo dd-mm-yy
    return `${day}-${month}-${year}`;
  },
  convertByteToMB: (byteSize) => {
    const mbSize = byteSize / 1048576; // 1048576 = 1MB
    return Number(mbSize % 1 === 0 ? mbSize.toFixed(0) : mbSize.toFixed(2));
  },
  sanitizedString: (inputString) => {
    return inputString.replace(/[^a-zA-Z0-9,\sÀ-ỹ]/g, "");
  },
  truncateString: (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + " ...";
    }
    return str;
  },
  resizeImage: (file, maxSizeInBytes, callback) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Tính toán kích thước mới dựa trên tỷ lệ giữa chiều rộng và chiều cao ban đầu
        let scale = 1;
        if (img.width > img.height) {
          scale = maxSizeInBytes / (img.width * img.height);
        } else {
          scale = maxSizeInBytes / (img.height * img.width);
        }
        const newWidth = img.width * Math.sqrt(scale);
        const newHeight = img.height * Math.sqrt(scale);

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          function (blob) {
            callback(blob);
          },
          "image/jpeg",
          0.9
        ); // Chỉ số chất lượng có thể điều chỉnh tùy thuộc vào nhu cầu
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  },

  getOptionByCode: (options, code) => {
    return options.find((option) => option.code === code);
  },

  onMapTranslation: (values = []) => {
    const result = values.map((value) => {
      if (typeof value === "string") {
        return translation(value);
      } else if (typeof value === "object") {
        return { ...value, name: translation(value?.name) };
      } else {
        return value;
      }
    });

    return result;
  },
};

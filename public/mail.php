<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $name = $input['fullName'];
    $phone = $input['phone'];
    $email = $input['email'];
    $items = $input['items'];

    if ($name != "" && $phone != "" && $email != "" && !empty($items)) {
        $subject = "Сообщение от $name";

        $message = "";
        $message .= "Имя: $name\n";
        $message .= "Телефон: $phone\n";
        $message .= "Email: $email\n\n";
        $message .= "Выбранные товары:\n\n";

        foreach ($items as $item) {
            $message .= "Название: " . $item['name'] . "\nЦена: " . $item['price'] . " ₽" . "\nТип: " . $item['type'] . "\nКатегория: " . $item['category'] . "\nЦвет: " . $item['color'] . "\nПол: " . $item['gender'] . "\nВозрастная группа: " . $item['ageGroup'] . "\nРостовка рамы: " . $item['frameGrowth'] . "\nКоличество скоростей: " . $item['speed'] . "\nДиаметр колеса: " . $item['wheelsSize'] . "\n\n";
        }

        $to = "musakubanov@gmail.com";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "При отправке сообщения произошла ошибка."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Пожалуйста, заполните все поля и выберите товары."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Неправильный метод запроса."]);
}
?>
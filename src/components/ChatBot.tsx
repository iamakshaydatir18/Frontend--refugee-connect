import { Component } from "react";

declare global {
    interface Window {
        kommunicate: any; // Adjust type as needed
    }
}

class ChatBot extends Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        (function(m) {
            var kommunicateSettings = {
                "appId": "3da1455e7618a314eac207b008274f1e6",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true
            };
            var s = document.createElement("script"); 
            s.type = "text/javascript"; 
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; 
            h.appendChild(s);
            window.kommunicate = m; 
            m._globals = kommunicateSettings;
        })(window.kommunicate || {});
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default ChatBot;

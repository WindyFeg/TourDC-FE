import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DestinationIcon = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        enableBackground="new 0 0 512 512"
    >
        <Path
            d="M317.8 335.3c-5.7-.3-11.1 2.1-14.099 6.901L256 416.6l-47.701-74.399c-2.999-4.801-8.399-7.5-14.099-6.901C94.9 345.801 31 379.701 31 422c0 58.5 115.8 90 225 90s225-31.5 225-90c0-42.299-63.9-76.199-163.2-86.7z"
            fill="#61de56"
        />
        <Path
            d="M481 422c0 58.5-115.8 90-225 90v-95.4l47.701-74.399c2.999-4.801 8.399-7.202 14.099-6.901C417.1 345.801 481 379.701 481 422z"
            fill="#13c37b"
        />
        <Path
            d="M256 0C166 0 91 72.599 91 165c0 35.099 10.499 66.599 30.901 96l121.5 191.6c2.999 4.799 7.8 6.899 12.6 6.899 4.799 0 9.6-2.1 12.599-6.899l122.1-192.2c19.801-28.2 30.3-61.2 30.3-95.4C421 74.099 346.901 0 256 0zm0 240c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75z"
            fill="#fd3018"
        />
        <Path
            d="M256 0v90c41.355 0 75 33.645 75 75s-33.645 75-75 75v219.5c4.799 0 9.6-2.1 12.599-6.899L390.7 260.4c19.801-28.2 30.3-61.2 30.3-95.4C421 74.099 346.901 0 256 0z"
            fill="#e61e14"
        />
    </Svg>
)

const ActivitiesIcon = () => (
    <Svg
        height={128}
        viewBox="0 0 512 512"
        width={128}
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M115.86 44.8 6.5 40.52 83.95 29l3.46-.51 25.46-3.79z"
            fill="#fba616"
        />
        <Path
            d="M86.9 36.91a2.461 2.461 0 0 1-.26.02 1.752 1.752 0 0 1-1.73-1.5L83.95 29l3.46-.51.96 6.43a1.763 1.763 0 0 1-1.47 1.99zm27.77 28.17a9.659 9.659 0 0 0 6.83 16.49v21.73H6.5V81.57a9.655 9.655 0 1 0 0-19.31V40.53h115v21.73a9.653 9.653 0 0 0-6.83 2.82z"
            fill="#fbdd6b"
        />
        <Path
            d="M114.67 65.08a9.659 9.659 0 0 0 6.83 16.49v21.73H6.5V81.57a9.655 9.655 0 1 0 0-19.31V40.53h115v21.73a9.653 9.653 0 0 0-6.83 2.82z"
            fill="#fbdd6b"
        />
        <Path
            d="M93.86 40.53v6.5a1.75 1.75 0 0 1-3.5 0v-6.5zm-1.75 34.08a1.746 1.746 0 0 0-1.75 1.75v11.55a1.75 1.75 0 0 0 3.5 0V76.36a1.752 1.752 0 0 0-1.75-1.75zm0-20.44a1.746 1.746 0 0 0-1.75 1.75v11.55a1.75 1.75 0 0 0 3.5 0V55.92a1.752 1.752 0 0 0-1.75-1.75zm1.75 42.63v6.5h-3.5v-6.5a1.75 1.75 0 0 1 3.5 0zM49.006 57.02H27.281a1.75 1.75 0 0 1 0-3.5h21.725a1.75 1.75 0 1 1 0 3.5zM70.73 68.116H27.281a1.75 1.75 0 0 1 0-3.5H70.73a1.75 1.75 0 0 1 0 3.5zm0 11.098H27.281a1.75 1.75 0 0 1 0-3.5H70.73a1.75 1.75 0 0 1 0 3.5zm0 11.097H27.281a1.75 1.75 0 0 1 0-3.5H70.73a1.75 1.75 0 0 1 0 3.5z"
            fill="#fba616"
        />
    </Svg>
)

const HotelIcon = () => (
    <Svg
        height={32}
        viewBox="0 0 512 512"
        width={32}
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M233.281 166.441a14.93 14.93 0 0 1-6.809-1.644c-7.378-3.767-10.306-12.802-6.539-20.18 5.685-11.136 8.568-23.176 8.568-35.785 0-43.468-35.363-78.831-78.831-78.831s-78.831 35.363-78.831 78.831c0 11.173 2.285 21.963 6.792 32.069 3.374 7.566-.024 16.435-7.59 19.809-7.564 3.374-16.434-.024-19.809-7.59-6.232-13.977-9.392-28.878-9.392-44.289C40.84 48.821 89.661 0 149.671 0s108.832 48.821 108.832 108.831c0 17.152-4.098 34.244-11.85 49.427-2.652 5.193-7.915 8.182-13.372 8.183z"
            fill="#fff566"
        />
        <Path
            d="M197.588 512.002h-148c-22.607 0-41-18.393-41-41v-298c0-22.607 18.393-41 41-41h148c22.607 0 41 18.393 41 41v298c0 22.607-18.392 41-41 41z"
            fill="#37a8e5"
        />
        <Path
            d="M197.588 132.001h-74v380h74c22.607 0 41-18.393 41-41v-298c0-22.607-18.392-41-41-41z"
            fill="#1a82c7"
        />
        <Path
            d="M160.266 302.001c-8.284 0-15 6.716-15 15v45H101.91v-45c0-8.284-6.716-15-15-15s-15 6.716-15 15v120c0 8.284 6.716 15 15 15s15-6.716 15-15v-45h43.356v45c0 8.284 6.716 15 15 15s15-6.716 15-15v-120c0-8.284-6.715-15-15-15z"
            fill="#006099"
        />
        <Path
            d="M160.266 302.001c-8.284 0-15 6.716-15 15v45h-21.678v30h21.678v45c0 8.284 6.716 15 15 15s15-6.716 15-15v-120c0-8.284-6.715-15-15-15z"
            fill="#00213b"
        />
        <Path
            d="m147.951 217.647-.276-.002a108.953 108.953 0 0 1-28.254-4.245c-7.959-2.299-12.547-10.615-10.249-18.574 2.299-7.959 10.615-12.544 18.574-10.249a78.877 78.877 0 0 0 20.47 3.072c8.283.15 14.876 6.985 14.727 15.268-.148 8.191-6.834 14.73-14.992 14.73z"
            fill="#ffcf2c"
        />
        <Path
            d="M148.216 187.649a78.883 78.883 0 0 1-20.47-3.072 15.001 15.001 0 0 0-4.158-.58v30.505a109.154 109.154 0 0 0 24.087 3.142l.276.002c8.158 0 14.844-6.539 14.992-14.73.15-8.281-6.444-15.117-14.727-15.267z"
            fill="#ffa81c"
        />
        <Path
            d="M488.414 421.584c-.89 0-1.783-.079-2.674-.24l-61.261-11.095a15.008 15.008 0 0 1-7.934-4.153L285.418 274.968l-4.3 4.299c-10.388 10.388-24.2 16.109-38.891 16.109s-28.503-5.721-38.891-16.109l-66.904-66.904c-21.444-21.444-21.444-56.336-.001-77.781l79.965-79.964c10.388-10.388 24.2-16.109 38.891-16.109s28.503 5.721 38.891 16.109l66.904 66.904c10.389 10.388 16.109 24.2 16.109 38.891 0 14.692-5.721 28.503-16.109 38.891l-4.3 4.299 27.264 27.264a14.99 14.99 0 0 1 3.729 6.191l5.107 16.578 16.578 5.107a14.998 14.998 0 0 1 9.919 9.918l5.107 16.578 16.578 5.107a14.998 14.998 0 0 1 9.919 9.919l5.547 18.007 27.446 13.632a14.995 14.995 0 0 1 8.087 10.757l11.108 61.247a15.002 15.002 0 0 1-4.15 13.282 15.003 15.003 0 0 1-10.607 4.394z"
            fill="#ffcf2c"
        />
        <Path
            d="m503.172 403.907-11.108-61.247a14.995 14.995 0 0 0-8.087-10.757l-27.446-13.632-5.547-18.007a14.998 14.998 0 0 0-9.919-9.919l-16.578-5.107-5.107-16.578a14.996 14.996 0 0 0-9.919-9.918l-16.578-5.107-5.107-16.578a14.997 14.997 0 0 0-3.729-6.191l-27.264-27.264 4.3-4.299c10.389-10.388 16.109-24.2 16.109-38.891s-5.721-28.502-16.109-38.891l-66.904-66.904c-10.388-10.388-24.199-16.109-38.891-16.109-14.691 0-28.502 5.721-38.891 16.109l-39.974 39.974L499.022 417.19a15.003 15.003 0 0 0 4.15-13.283z"
            fill="#ffa81c"
        />
        <Path
            d="M233.419 184.101c-8.558 0-16.922-3.466-22.988-9.511-6.045-6.045-9.512-14.43-9.512-22.989 0-8.558 3.467-16.921 9.512-22.966 6.045-6.067 14.43-9.534 22.988-9.534 8.559 0 16.943 3.467 22.988 9.534 6.045 6.045 9.512 14.408 9.512 22.966 0 8.559-3.467 16.944-9.512 22.989-6.066 6.045-14.429 9.511-22.988 9.511z"
            fill="#006099"
        />
        <Path
            d="M256.415 174.582c6.04-6.044 9.504-14.426 9.504-22.981 0-8.558-3.467-16.921-9.512-22.966-6.045-6.067-14.429-9.534-22.988-9.534-8.549 0-16.925 3.46-22.969 9.516z"
            fill="#00213b"
        />
        <Path
            d="M149.671 0v30c43.468 0 78.831 35.363 78.831 78.831 0 12.609-2.883 24.649-8.568 35.785-3.767 7.379-.839 16.414 6.539 20.18a14.927 14.927 0 0 0 6.809 1.644c5.457-.001 10.72-2.989 13.372-8.183 7.752-15.183 11.85-32.275 11.85-49.427C258.502 48.821 209.681 0 149.671 0z"
            fill="#ffe645"
        />
    </Svg>
)

const RestaurantIcon = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
    >
        <Path
            style={{
                fill: "#86d6f2",
            }}
            d="M466.786 512c-11.524 0-23.049-4.386-31.822-13.159L234.258 298.135l63.647-63.647 200.704 200.704c17.548 17.547 17.548 46.099 0 63.647C489.835 507.614 478.31 512 466.786 512z"
        />
        <Path
            style={{
                fill: "#ace3fc",
            }}
            d="m209.802 301.966-151.27-151.27c-17.064-17.064-27.224-40.218-29.383-66.962-1.895-23.462 2.324-49.13 12.201-74.227L45.09 0h18.325l224.176 224.176-77.789 77.79z"
        />
        <Path
            style={{
                fill: "#ccefff",
            }}
            d="m490.181 85.223-81.327 81.326-21.216-21.215 81.327-81.327-21.215-21.215-81.326 81.326-21.215-21.215 81.327-81.326L405.32.361 299.242 106.438a74.877 74.877 0 0 0-21.821 48.52c-.645 10.79-5.451 21.183-13.533 29.266L13.39 434.721c-17.547 17.547-17.547 46.099 0 63.646 8.773 8.774 20.298 13.16 31.822 13.16 11.525 0 23.049-4.386 31.823-13.16L327.532 247.87c8.083-8.083 18.477-12.889 29.266-13.534a74.866 74.866 0 0 0 48.52-21.82l106.077-106.077-21.214-21.216z"
        />
        <Path
            style={{
                fill: "#ace3fc",
            }}
            d="m408.856 166.549-21.216-21.215 81.326-81.327L458.358 53.4 13.39 498.367c8.773 8.774 20.298 13.16 31.822 13.16 11.525 0 23.049-4.386 31.823-13.16L327.532 247.87c8.083-8.083 18.477-12.889 29.266-13.534a74.866 74.866 0 0 0 48.52-21.82l106.077-106.077-21.215-21.214-81.324 81.324z"
        />
    </Svg>


)
const QRCodeIcon = () => (
    <Svg
        width="30"
        height="30"
        viewBox="0 0 512 512"
        fill="none"
        fillOpacity="0.5"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path d="M23.2729 186.182C9.30937 186.182 0 176.872 0 162.909V69.8179C0 30.2543 30.2543 0 69.8179 0H162.909C176.872 0 186.182 9.30937 186.182 23.2729C186.182 37.2365 176.872 46.5459 162.909 46.5459H69.8179C55.8543 46.5459 46.5449 55.8552 46.5449 69.8188V162.91C46.5459 176.872 37.2365 186.182 23.2729 186.182ZM488.727 186.182C474.763 186.182 465.454 176.872 465.454 162.909V69.8179C465.454 55.8543 456.145 46.5449 442.181 46.5449H349.09C335.127 46.5449 325.817 37.2356 325.817 23.272C325.817 9.30842 335.127 0 349.09 0H442.181C481.745 0 511.999 30.2543 511.999 69.8179V162.909C512 176.872 502.691 186.182 488.727 186.182ZM162.909 512H69.8179C30.2543 512 0 481.746 0 442.182V349.091C0 335.128 9.30937 325.818 23.2729 325.818C37.2365 325.818 46.5459 335.128 46.5459 349.091V442.182C46.5459 456.146 55.8552 465.455 69.8188 465.455H162.91C176.873 465.455 186.183 474.764 186.183 488.728C186.182 502.691 176.872 512 162.909 512ZM442.182 512H349.091C335.128 512 325.818 502.691 325.818 488.727C325.818 474.763 335.128 465.454 349.091 465.454H442.182C456.146 465.454 465.455 456.145 465.455 442.181V349.09C465.455 335.127 474.764 325.817 488.728 325.817C502.692 325.817 512.001 335.127 512.001 349.09V442.181C512 481.746 481.746 512 442.182 512Z" fill="black" />
        <Path d="M209.455 232.728H116.364C102.4 232.728 93.0908 223.418 93.0908 209.455V116.364C93.0908 102.4 102.4 93.0908 116.364 93.0908H209.455C223.418 93.0908 232.728 102.4 232.728 116.364V209.455C232.728 223.418 223.418 232.728 209.455 232.728ZM139.637 186.182H186.183V139.636H139.637V186.182ZM209.455 418.909H116.364C102.4 418.909 93.0908 409.6 93.0908 395.636V302.545C93.0908 288.582 102.4 279.272 116.364 279.272H209.455C223.418 279.272 232.728 288.582 232.728 302.545V395.636C232.728 409.6 223.418 418.909 209.455 418.909ZM139.637 372.363H186.183V325.817H139.637V372.363ZM395.636 232.728H302.545C288.582 232.728 279.272 223.418 279.272 209.455V116.364C279.272 102.4 288.582 93.0908 302.545 93.0908H395.636C409.6 93.0908 418.909 102.4 418.909 116.364V209.455C418.909 223.418 409.6 232.728 395.636 232.728ZM325.818 186.182H372.364V139.636H325.818V186.182ZM302.545 349.09C288.582 349.09 279.272 339.781 279.272 325.817V302.544C279.272 288.581 288.582 279.272 302.545 279.272C316.509 279.272 325.818 288.581 325.818 302.544V325.817C325.818 339.782 316.509 349.09 302.545 349.09ZM395.636 325.818H372.363C358.4 325.818 349.09 316.509 349.09 302.545C349.09 288.582 358.4 279.272 372.363 279.272H395.636C409.6 279.272 418.909 288.582 418.909 302.545C418.909 316.509 409.6 325.818 395.636 325.818ZM395.636 418.909H325.818C311.855 418.909 302.545 409.6 302.545 395.636C302.545 381.673 311.855 372.363 325.818 372.363H395.636C409.6 372.363 418.909 381.673 418.909 395.636C418.909 409.6 409.6 418.909 395.636 418.909Z" fill="black" />
    </Svg>
)

const SearchIcon = () => (
    <Svg
        width="30"
        height="30"
        viewBox="0 0 512 512"
        fill="none"
        fillOpacity="0.5">
        <Path
            d="M499.875 437.922L382.163 320.201C402.862 287.299 413.82 249.209 413.771 210.338C413.771 96.0741 321.141 3.45691 206.881 3.45691C92.6215 3.45691 0 96.0741 0 210.338C0 324.606 92.6171 417.215 206.881 417.215C249.142 417.269 290.397 404.319 325.046 380.124L441.357 496.444C445.198 500.287 449.76 503.333 454.781 505.409C459.802 507.484 465.183 508.548 470.616 508.539C476.051 508.548 481.434 507.485 486.458 505.409C491.481 503.334 496.045 500.287 499.888 496.444C507.645 488.681 512.001 478.155 511.999 467.18C511.996 456.206 507.635 445.681 499.875 437.922ZM206.881 350.188C129.652 350.188 67.0394 287.58 67.0394 210.347C67.0394 133.113 129.652 70.5006 206.881 70.5006C284.114 70.5006 346.723 133.113 346.723 210.347C346.723 287.58 284.114 350.188 206.881 350.188Z"
            fill="black"
        />
    </Svg>

)

const StarIcon = (props) => (
    <Svg
        width={props.size}
        height={props.size}
        viewBox="0 0 512 512"
        fill="none"
    >
        <Path
            d="M510.665 186.4C509.028 181.327 505.934 176.847 501.768 173.52C497.602 170.193 492.549 168.165 487.239 167.69L339.462 154.27L281.027 17.497C276.717 7.47371 266.905 0.987549 256.003 0.987549C245.1 0.987549 235.287 7.47471 230.979 17.522L172.543 154.271L24.7426 167.69C19.4387 168.176 14.3939 170.207 10.2339 173.533C6.0738 176.859 2.98139 181.333 1.34005 186.4C-2.03104 196.769 1.08204 208.14 9.29725 215.308L121 313.271L88.0612 458.364C85.6512 469.032 89.7913 480.061 98.6435 486.459C103.401 489.897 108.968 491.647 114.581 491.647C119.421 491.647 124.221 490.342 128.531 487.764L256.003 411.578L383.428 487.764C392.752 493.374 404.506 492.861 413.338 486.459C417.662 483.329 420.971 478.997 422.852 474.002C424.734 469.007 425.105 463.569 423.921 458.364L390.983 313.271L502.685 215.328C506.703 211.819 509.602 207.206 511.02 202.063C512.439 196.92 512.316 191.474 510.665 186.4Z"
            fill={props.color}
        />
    </Svg>
)

const BackArrowIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 512 440"
        fill="none">
        <Path
            d="M481.226 184.062C479.131 183.722 477.011 183.565 474.889 183.593H113.684L121.56 179.929C129.258 176.285 136.263 171.327 142.258 165.276L243.549 63.9849C256.889 51.2503 259.13 30.7642 248.861 15.4458C236.908 -0.877788 213.986 -4.42206 197.661 7.53071C196.342 8.49681 195.089 9.55008 193.911 10.6835L10.7439 193.85C-3.57056 208.149 -3.58315 231.343 10.7153 245.658L10.7439 245.686L193.911 428.853C208.236 443.139 231.431 443.107 245.718 428.781C246.842 427.653 247.892 426.454 248.861 425.19C259.13 409.871 256.889 389.385 243.549 376.65L142.441 275.176C137.066 269.795 130.887 265.284 124.124 261.805L113.134 256.859H472.873C491.587 257.554 508.006 244.482 511.522 226.087C514.76 206.117 501.197 187.302 481.226 184.062Z"
            fill="white"
        />
    </Svg>
)

const ThreeDotsIcon = (props) => (
    <Svg
        width={20}
        height={4}
        viewBox="0 0 512 104"
        fill="none">
        <Path
            d="M51.2004 103.2C79.4775 103.2 102.401 80.2766 102.401 51.9994C102.401 23.7222 79.4775 0.799072 51.2004 0.799072C22.9232 0.799072 0 23.7222 0 51.9994C0 80.2766 22.9232 103.2 51.2004 103.2Z"
            fill="white"
        />
        <Path
            d="M255.999 103.2C284.277 103.2 307.2 80.2766 307.2 51.9994C307.2 23.7222 284.277 0.799072 255.999 0.799072C227.722 0.799072 204.799 23.7222 204.799 51.9994C204.799 80.2766 227.722 103.2 255.999 103.2Z"
            fill="white"
        />
        <Path
            d="M460.8 103.2C489.077 103.2 512 80.2766 512 51.9994C512 23.7222 489.077 0.799072 460.8 0.799072C432.523 0.799072 409.599 23.7222 409.599 51.9994C409.599 80.2766 432.523 103.2 460.8 103.2Z"
            fill="white"
        />
    </Svg>
)


const SvgComponent = (props) => {
    switch (props.name) {
        case 'Destination':
            return <DestinationIcon />;
        case 'Activities':
            return <ActivitiesIcon />;
        case 'Hotel':
            return <HotelIcon />;
        case 'Restaurant':
            return <RestaurantIcon />;
        case 'QRCode':
            return <QRCodeIcon />;
        case 'Search':
            return <SearchIcon />;
        case 'StarSmall0':
            return <StarIcon color="#FFC107" size="14" />;
        case 'StarSmall1':
            return <StarIcon color="#fff" size="14" />;
        case 'StarBig0':
            return <StarIcon color="#FFC107" size="30" />;
        case 'StarBig1':
            return <StarIcon color="#fff" size="30" />;
        case 'BackArrow':
            return <BackArrowIcon />;
        case 'ThreeDots':
            return <ThreeDotsIcon />;
        default:
            return <DestinationIcon />;
    }
}

export default SvgComponent;
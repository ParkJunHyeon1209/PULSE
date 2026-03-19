import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const starBlink = keyframes`
  0%, 100% { opacity: 1; transform: rotate(0deg) scale(1); }
  50%       { opacity: 0.35; transform: rotate(45deg) scale(1.2); }
`;

export const LavStarIcon = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tones.violet.subtleColor};
  margin-right: ${({ theme }) => theme.spacing[1]};
  text-shadow: ${({ theme }) => theme.effects.PurpleStar};
  animation: ${({ $animate = true }) =>
    $animate
      ? css`
          ${starBlink} 3s ease-in-out infinite
        `
      : 'none'};
`;

export default function StarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
    >
      <g filter="url(#filter0_dd_546_712)">
        <path
          d="M22.004 26.448C21.9233 25.9713 21.7107 25.458 21.366 24.908C21.0213 24.3507 20.53 23.8337 19.892 23.357C19.2613 22.8803 18.6307 22.576 18 22.444V21.982C18.6233 21.8353 19.221 21.564 19.793 21.168C20.3723 20.7647 20.8563 20.2807 21.245 19.716C21.641 19.1367 21.894 18.5647 22.004 18H22.466C22.532 18.3667 22.664 18.7443 22.862 19.133C23.06 19.5143 23.313 19.881 23.621 20.233C23.9363 20.5777 24.2883 20.8893 24.677 21.168C25.2563 21.5787 25.8467 21.85 26.448 21.982V22.444C26.0447 22.5247 25.6267 22.6897 25.194 22.939C24.7687 23.1883 24.3727 23.4853 24.006 23.83C23.6393 24.1673 23.3387 24.523 23.104 24.897C22.7593 25.447 22.5467 25.964 22.466 26.448H22.004Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_546_712"
          x="0"
          y="0"
          width="44.448"
          height="44.448"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="9" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.654902 0 0 0 0 0.545098 0 0 0 0 0.980392 0 0 0 0.1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_546_712" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_546_712"
            result="effect2_dropShadow_546_712"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_546_712"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 1.5L6 5L2 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 헤더 아이콘
export function UserIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M9 9C9.89511 9 10.7536 8.64442 11.3865 8.01149C12.0194 7.37855 12.375 6.52011 12.375 5.625C12.375 4.72989 12.0194 3.87145 11.3865 3.23851C10.7536 2.60558 9.89511 2.25 9 2.25C8.10489 2.25 7.24645 2.60558 6.61351 3.23851C5.98058 3.87145 5.625 4.72989 5.625 5.625C5.625 6.52011 5.98058 7.37855 6.61351 8.01149C7.24645 8.64442 8.10489 9 9 9ZM11.25 5.625C11.25 6.22174 11.0129 6.79403 10.591 7.21599C10.169 7.63795 9.59674 7.875 9 7.875C8.40326 7.875 7.83097 7.63795 7.40901 7.21599C6.98705 6.79403 6.75 6.22174 6.75 5.625C6.75 5.02826 6.98705 4.45597 7.40901 4.03401C7.83097 3.61205 8.40326 3.375 9 3.375C9.59674 3.375 10.169 3.61205 10.591 4.03401C11.0129 4.45597 11.25 5.02826 11.25 5.625ZM15.75 14.625C15.75 15.75 14.625 15.75 14.625 15.75H3.375C3.375 15.75 2.25 15.75 2.25 14.625C2.25 13.5 3.375 10.125 9 10.125C14.625 10.125 15.75 13.5 15.75 14.625ZM14.625 14.6205C14.6239 14.3438 14.4518 13.5112 13.689 12.7485C12.9555 12.015 11.5751 11.25 9 11.25C6.42487 11.25 5.0445 12.015 4.311 12.7485C3.54825 13.5112 3.37725 14.3438 3.375 14.6205H14.625Z" />
    </svg>
  );
}

export function SearchIcon({ strokeWidth = '1.5', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      {...props}
    >
      <path
        d="M8.75 13.5C11.6495 13.5 14 11.1495 14 8.25C14 5.35051 11.6495 3 8.75 3C5.85051 3 3.5 5.35051 3.5 8.25C3.5 11.1495 5.85051 13.5 8.75 13.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9875 12.4875L16.25 15.75"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon({ strokeWidth = '1', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M2.25 4.5L4.5 1.5H13.5L15.75 4.5M2.25 4.5V15C2.25 15.3978 2.40804 15.7794 2.68934 16.0607C2.97064 16.342 3.35218 16.5 3.75 16.5H14.25C14.6478 16.5 15.0294 16.342 15.3107 16.0607C15.592 15.7794 15.75 15.3978 15.75 15V4.5M2.25 4.5H15.75M12 7.5C12 8.29565 11.6839 9.05871 11.1213 9.62132C10.5587 10.1839 9.79565 10.5 9 10.5C8.20435 10.5 7.44129 10.1839 6.87868 9.62132C6.31607 9.05871 6 8.29565 6 7.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
export function LoginIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}
// 테마 토글 아이콘
export function SunIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// 푸터아이콘
export function TwitterIcon({ strokeWidth = '0.75', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M6.0127 3L9.44434 7.55176L9.71289 7.9082L10.0176 7.58105L14.292 3H14.4902L10.0166 7.7959L9.80176 8.02539L9.99121 8.27734L15.2471 15.25H12.0215L8.28613 10.2949L8.0166 9.93848L7.71191 10.2656L3.06152 15.25H2.86328L7.71387 10.0508L7.92871 9.82129L7.73926 9.56934L2.78711 3H6.0127ZM3.53516 3.74512L11.9863 14.9561L12.0986 15.1055H14.9521L14.499 14.5049L6.04785 3.29395L5.93555 3.14453H3.08203L3.53516 3.74512Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function KakaoIcon({ strokeWidth = '0.75', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M9 2.25C4.85775 2.25 1.5 4.8975 1.5 8.16375C1.5 10.275 2.904 12.1275 5.01525 13.1737C4.9005 13.5697 4.27725 15.7238 4.2525 15.8918C4.2525 15.8918 4.2375 16.0185 4.32 16.0673C4.34766 16.0813 4.37793 16.0895 4.4089 16.0913C4.43988 16.0931 4.47089 16.0885 4.5 16.0778C4.73625 16.0455 7.23675 14.289 7.6695 13.9837C8.11026 14.046 8.55486 14.0771 9 14.0768C13.1422 14.0768 16.5 11.4292 16.5 8.16375C16.5 4.89825 13.1422 2.25 9 2.25Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M3.74557 6.77148H5.9614C5.97418 6.77159 5.98653 6.77708 5.99557 6.78613C6.0046 6.79523 6.01019 6.80749 6.01022 6.82031C6.01022 6.83312 6.00455 6.84538 5.99557 6.85449C5.98653 6.86354 5.97418 6.86904 5.9614 6.86914H4.91061V9.7959C4.90898 9.80942 4.90298 9.82165 4.89304 9.83105C4.88218 9.84129 4.86792 9.84766 4.853 9.84766C4.83817 9.84759 4.82375 9.84123 4.81296 9.83105C4.80291 9.82144 4.7968 9.80871 4.79538 9.79492V6.86914H3.74557C3.7392 6.86914 3.73292 6.86767 3.72702 6.86523C3.72111 6.86278 3.71592 6.85902 3.7114 6.85449C3.70688 6.84997 3.7031 6.84477 3.70065 6.83887C3.69824 6.83299 3.69675 6.82667 3.69675 6.82031C3.69676 6.81396 3.69822 6.80763 3.70065 6.80176C3.7031 6.79588 3.70689 6.79064 3.7114 6.78613C3.7159 6.78166 3.72115 6.77782 3.72702 6.77539C3.73289 6.77298 3.73923 6.77148 3.74557 6.77148ZM12.1255 6.77148C12.1407 6.77154 12.1557 6.77828 12.1665 6.78906C12.177 6.79977 12.183 6.81411 12.1831 6.8291V8.66504L12.8237 8.02441L14.0122 6.83398C14.0211 6.83679 14.0296 6.84115 14.0366 6.84766C14.0439 6.85458 14.0489 6.86369 14.0522 6.87305L13.0844 7.84277L12.854 8.07324L13.0503 8.33301L14.1157 9.74414C14.1249 9.75635 14.1285 9.77199 14.1264 9.78711C14.125 9.79695 14.1207 9.80572 14.1147 9.81348L14.101 9.82422C14.0924 9.8307 14.0816 9.83405 14.0708 9.83398H14.0669C14.0584 9.83402 14.05 9.83184 14.0424 9.82812C14.035 9.8244 14.028 9.81915 14.0229 9.8125L14.0219 9.81152L13.0073 8.4668L12.7475 8.12207L12.4428 8.42773L12.2924 8.57715L12.1831 8.6875V9.78711C12.183 9.80209 12.177 9.81646 12.1665 9.82715C12.1557 9.83793 12.1407 9.84467 12.1255 9.84473C12.1101 9.84473 12.0953 9.83798 12.0844 9.82715C12.0738 9.81643 12.0679 9.80219 12.0678 9.78711V6.8291C12.0679 6.81401 12.0738 6.79979 12.0844 6.78906C12.0953 6.77823 12.1101 6.77148 12.1255 6.77148ZM9.7485 6.7627C9.76612 6.7627 9.78288 6.76981 9.79538 6.78223C9.80782 6.79466 9.81482 6.81152 9.81491 6.8291V9.74609H11.1098C11.1156 9.74612 11.1214 9.74887 11.1255 9.75293C11.1292 9.75688 11.1312 9.76211 11.1313 9.76758C11.1313 9.77324 11.1294 9.77915 11.1255 9.7832C11.1232 9.78548 11.1196 9.78603 11.1167 9.78711H9.71335C9.70517 9.78717 9.69681 9.78398 9.69089 9.77832L9.6821 9.75684V6.8291C9.68219 6.81152 9.68919 6.79466 9.70163 6.78223C9.71413 6.76982 9.73089 6.7627 9.7485 6.7627ZM7.41354 6.76367C7.4624 6.76367 7.51027 6.78017 7.54929 6.80957C7.58816 6.83896 7.6169 6.87991 7.63034 6.92676L7.63425 6.94238L7.64011 6.95703L8.66745 9.66016V9.66113C8.69529 9.74771 8.70483 9.8054 8.70749 9.84082C8.68833 9.8448 8.66858 9.84676 8.6489 9.84668H8.61862L8.42331 9.33594L8.33151 9.09473H6.49557L6.40378 9.33594L6.20749 9.84668H6.17819C6.15851 9.84674 6.13875 9.84483 6.1196 9.84082C6.12208 9.8074 6.13052 9.7533 6.15573 9.67285L7.18796 6.95703L7.19284 6.94238L7.19772 6.92676C7.21121 6.87985 7.23979 6.83894 7.27878 6.80957C7.31773 6.78025 7.36479 6.76372 7.41354 6.76367Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
export function InstaIcon({ strokeWidth = '0.75', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M12.75 1.5H5.25C3.17893 1.5 1.5 3.17893 1.5 5.25V12.75C1.5 14.8211 3.17893 16.5 5.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V5.25C16.5 3.17893 14.8211 1.5 12.75 1.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.52724C12.0926 9.15142 11.9859 9.7889 11.6953 10.349C11.4047 10.9091 10.9449 11.3633 10.3812 11.647C9.81757 11.9307 9.17883 12.0294 8.55583 11.9292C7.93284 11.8289 7.35731 11.5348 6.91112 11.0886C6.46493 10.6424 6.17079 10.0669 6.07054 9.4439C5.9703 8.8209 6.06904 8.18216 6.35274 7.61852C6.63643 7.05488 7.09063 6.59504 7.65073 6.30442C8.21083 6.01379 8.84831 5.90718 9.47249 5.99974C10.1092 6.09415 10.6986 6.39084 11.1538 6.84597C11.6089 7.3011 11.9056 7.89055 12 8.52724Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 4.875H13.1325"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function YoutubeIcon({ strokeWidth = '0.75', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <path
        d="M2.86133 3.75684C6.68316 3.12369 10.5782 3.08371 14.4092 3.6377L15.1748 3.75684L15.2256 3.76758C15.5602 3.85939 15.865 4.0369 16.1104 4.28223C16.3252 4.49712 16.4881 4.75773 16.5869 5.04395L16.625 5.16797L16.6318 5.19629C17.1702 7.73713 17.1702 10.3625 16.6318 12.9033C16.6298 12.9128 16.6276 12.9223 16.625 12.9316C16.5332 13.2664 16.3558 13.5719 16.1104 13.8174C15.865 14.0627 15.5602 14.2402 15.2256 14.332C15.209 14.3366 15.1918 14.34 15.1748 14.3428C11.0981 15.0183 6.93801 15.0183 2.86133 14.3428C2.84433 14.34 2.82717 14.3366 2.81055 14.332C2.47592 14.2403 2.17117 14.0627 1.92578 13.8174C1.68031 13.5719 1.50292 13.2664 1.41113 12.9316C1.40857 12.9223 1.40631 12.9128 1.4043 12.9033C0.865891 10.3624 0.865891 7.73716 1.4043 5.19629L1.41113 5.16797C1.50292 4.83318 1.68031 4.5277 1.92578 4.28223C2.17117 4.03691 2.47592 3.85936 2.81055 3.76758C2.82717 3.76302 2.84432 3.75965 2.86133 3.75684Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.3125L11.25 9.05006L7.5 6.7876V11.3125Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 카드 아이콘
export function HeartIcon({ strokeWidth = '1.8', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

export function PluseIcon({ strokeWidth = '2', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

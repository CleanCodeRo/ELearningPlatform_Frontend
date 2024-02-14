export default function FilterButton({ image, title, text }){
    return (
        <div className="bg-white w-32 h-32 flex justify-center flex-col items-center rounded-3xl ml-10 cursor-pointer">
    <div id="icon" className="h-16 w-16 rounded-full flex items-center justify-center">
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="256" height="256" viewBox="-80 0 450 256"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
fill="#afafaf" stroke="none">
<path d="M0 2378 c0 -199 11 -272 54 -357 34 -67 117 -154 187 -197 l59 -37 0
-59 c0 -44 -3 -59 -12 -55 -118 52 -136 57 -211 57 l-79 0 4 -237 c3 -233 4
-239 30 -295 49 -105 139 -182 252 -217 51 -15 61 -24 172 -156 l119 -140 5
-190 c5 -188 6 -191 37 -257 44 -93 100 -151 191 -196 l76 -37 396 0 396 0 76
37 c91 45 147 103 191 196 31 66 32 69 37 257 l5 190 119 140 c111 132 121
141 172 156 113 35 203 112 252 217 26 56 27 62 30 295 l4 237 -79 0 c-75 0
-93 -5 -210 -57 -10 -4 -13 11 -13 55 l0 59 59 37 c70 43 153 130 187 197 43
85 54 158 54 357 l0 182 -73 0 -73 0 -12 -45 c-26 -96 -134 -170 -294 -201
l-86 -17 -81 65 c-124 99 -269 164 -421 188 -84 13 -396 13 -480 0 -153 -24
-295 -88 -419 -187 l-83 -66 -86 17 c-162 32 -268 105 -294 201 l-12 45 -73 0
-73 0 0 -182z m1575 8 c64 -17 225 -93 225 -106 0 -4 -33 -38 -73 -76 -125
-119 -272 -177 -447 -177 -176 0 -322 57 -446 175 -41 39 -74 73 -74 77 0 9
110 68 161 87 100 36 169 43 384 40 156 -2 225 -7 270 -20z m-1377 -141 c39
-26 172 -75 203 -75 31 0 31 -17 0 -72 -16 -29 -37 -74 -46 -100 -10 -27 -23
-48 -30 -48 -18 0 -94 69 -120 110 -13 20 -30 61 -39 90 -15 52 -22 120 -11
120 3 0 22 -11 43 -25z m2197 -91 c-9 -31 -27 -73 -40 -94 -26 -41 -102 -110
-121 -110 -7 0 -18 17 -24 38 -7 20 -27 65 -46 100 -35 65 -36 82 -5 82 29 0
158 47 203 74 l43 26 3 -30 c2 -17 -4 -56 -13 -86z m-1581 -133 c235 -162 547
-190 803 -71 105 49 163 89 240 167 l62 63 41 -52 c56 -70 107 -173 132 -267
19 -68 21 -113 25 -428 l5 -353 -146 -174 -146 -174 0 -184 c0 -217 -10 -258
-75 -323 -71 -72 -91 -75 -475 -75 -384 0 -404 3 -475 75 -65 65 -75 106 -75
323 l0 184 -146 174 -146 174 4 352 c5 317 7 361 26 429 25 94 76 197 131 267
l41 52 63 -63 c34 -35 84 -78 111 -96z m-617 -472 c19 -12 48 -40 64 -62 l29
-40 0 -154 0 -154 -29 16 c-39 20 -86 78 -100 124 -11 40 -16 291 -5 291 4 0
22 -10 41 -21z m2213 -105 c0 -71 -5 -145 -12 -168 -12 -40 -95 -136 -118
-136 -6 0 -10 53 -10 153 0 147 1 154 25 190 23 33 87 85 108 86 4 1 7 -56 7
-125z"/>
<path d="M920 1723 c1 -21 7 -55 14 -75 l14 -38 -174 0 -174 0 0 -80 c0 -144
69 -266 184 -325 49 -25 72 -30 153 -33 l95 -4 -7 -117 c-4 -64 -8 -123 -11
-131 -2 -10 41 -46 131 -108 l135 -93 135 92 c94 65 134 98 131 108 -3 9 -7
68 -11 132 l-7 117 95 4 c81 3 104 8 153 33 115 59 184 181 184 325 l0 80
-174 0 -174 0 14 38 c7 20 13 54 14 75 l0 38 -71 -3 -72 -3 -11 -46 c-16 -61
-48 -103 -104 -136 -120 -71 -272 -3 -308 136 l-11 46 -72 3 -71 3 0 -38z
m130 -302 c0 -21 -3 -53 -6 -70 l-6 -31 -72 0 c-87 0 -128 19 -173 78 -18 24
-33 48 -33 53 0 5 63 9 145 9 l145 0 0 -39z m750 30 c0 -5 -15 -29 -33 -53
-45 -59 -86 -78 -173 -78 l-71 0 -7 31 c-3 17 -6 49 -6 70 l0 39 145 0 c82 0
145 -4 145 -9z m-435 -86 c6 -44 27 -386 23 -389 -2 -1 -27 -19 -55 -39 l-53
-37 -52 37 c-29 20 -54 38 -56 39 -4 3 17 345 23 389 l5 30 80 0 80 0 5 -30z"/>
<path d="M1018 573 l-3 -58 -43 -3 -43 -3 3 -72 3 -72 345 0 345 0 3 72 3 72
-43 3 -43 3 -3 58 -3 57 -74 0 -75 0 0 -60 0 -60 -110 0 -110 0 0 60 0 60 -75
0 -74 0 -3 -57z"/>
</g>
</svg>
    </div>
    <p className="font-bold uppercase text-center text-[13px] mb-3 text-[#afafaf]">{title}</p>
    <p className="text-center text-sm text-[#afafaf]">{text}</p>
</div>

    )
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },

        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },

        'slide-left2': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'rotate-center': {
          '0%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);'
          }
        },

        'rotate-center-pause': {
          '0%': {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);',
            'border-radius': '99999px;'
          },
          '100%': {
            '-webkit-transform': 'rotate(0);',
            transform: 'rotate(0);'
          }
        }, 
        'scale-up-image': {
          '0%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);',
          },
          '100%': {
            '-webkit-transform': 'scale(1.2)',
            transform: 'scale(1.2)'
          }
        },
        'scale-down-image': {
          '0%': {
            '-webkit-transform': 'scale(1.2);',
            transform: 'scale(1.2);',
          },
          '100%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 5s linear infinite;',
        'rotate-center-pause': 'rotate-center-pause 0.5s linear 2 both;',
        'scale-up-image': 'scale-up-image 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down-image': 'scale-down-image 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      }, 
      flex: {
        '3': '3 3 0%',
        '7': '7 7 0%'
      }
    },
    screens: {
      '1300': '1300px',
    }
  },
  plugins: [],
}
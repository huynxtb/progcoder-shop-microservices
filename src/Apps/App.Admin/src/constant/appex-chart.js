let colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export const latestBarChart = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: " data one",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 0.6),
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
      {
        label: " data two",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 0.8),
        borderColor: colors.success,
        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};
export const latestBarChartDark = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: " data one",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 0.6),
        borderColor: colors.primary,

        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
      {
        label: " data two",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 0.8),
        borderColor: colors.success,
        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },

    scales: {
      y: {
        grid: {
          color: "#334155",
        },
        ticks: {
          color: "#cbd5e1",
        },
      },
      x: {
        grid: {
          color: "#334155",
        },

        ticks: {
          color: "#cbd5e1",
        },
      },
    },

    maintainAspectRatio: false,
  },
};
export const horizenTal = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],

    datasets: [
      {
        label: "Option A",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 0.9),
        borderWidth: 2,
        borderColor: "transparent",
        barThickness: 20,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
  },
};
export const horizenTalDark = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],

    datasets: [
      {
        label: "Option A",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 0.9),
        borderWidth: 2,
        borderColor: "transparent",
        barThickness: 20,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },

    scales: {
      y: {
        grid: {
          color: "#334155",
        },
        ticks: {
          color: "#cbd5e1",
        },
      },
      x: {
        grid: {
          color: "#334155",
        },

        ticks: {
          color: "#cbd5e1",
        },
      },
    },
    indexAxis: "y",
  },
};

export const barStacked = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: " data one",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 1),
        borderColor: colors.primary,

        borderSkipped: "bottom",
        barThickness: 40,
      },
      {
        label: " data two",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 1),
        borderColor: colors.success,

        borderSkipped: "bottom",
        barThickness: 40,
      },
      {
        label: " data three",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.danger, 1),
        borderColor: colors.success,

        borderSkipped: "bottom",
        barThickness: 40,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
};
export const barStackedDark = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: " data one",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 1),
        borderColor: colors.primary,

        borderSkipped: "bottom",
        barThickness: 40,
      },
      {
        label: " data two",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 1),
        borderColor: colors.success,

        borderSkipped: "bottom",
        barThickness: 40,
      },
      {
        label: " data three",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.danger, 1),
        borderColor: colors.success,

        borderSkipped: "bottom",
        barThickness: 40,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "#334155",
        },

        ticks: {
          color: "#cbd5e1",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#334155",
        },

        ticks: {
          color: "#cbd5e1",
        },
      },
    },
  },
};

export const LineChart = {
  data: {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        label: " data one",
        data: [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375,
        ],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 1),
        borderColor: colors.primary,
        borderSkipped: "bottom",
        barThickness: 40,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 5,
        pointBorderColor: "transparent",
        lineTension: 0.5,
        pointStyle: "circle",
        pointShadowOffsetX: 1,
        pointShadowOffsetY: 1,
        pointShadowBlur: 5,
      },
      {
        label: " data two",
        data: [
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          280,
        ],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 1),
        borderColor: colors.success,
        borderSkipped: "bottom",
        barThickness: 40,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 5,
        pointBorderColor: "transparent",
        lineTension: 0.5,
        pointStyle: "circle",
        pointShadowOffsetX: 1,
        pointShadowOffsetY: 1,
        pointShadowBlur: 5,
      },
      {
        label: " data three",
        data: [
          80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180,
        ],
        fill: false,
        backgroundColor: hexToRGB(colors.danger, 1),
        borderColor: colors.danger,
        borderSkipped: "bottom",
        barThickness: 40,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 5,
        pointBorderColor: "transparent",
        lineTension: 0.5,
        pointStyle: "circle",
        pointShadowOffsetX: 1,
        pointShadowOffsetY: 1,
        pointShadowBlur: 5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
      },
    },
  },
};
export const LineChartDark = {
  data: {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        label: " data one",
        data: [
          80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
          375,
        ],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 1),
        borderColor: colors.primary,
        borderSkipped: "bottom",
        barThickness: 40,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 5,
        pointBorderColor: "transparent",
        lineTension: 0.5,
        pointStyle: "circle",
        pointShadowOffsetX: 1,
        pointShadowOffsetY: 1,
        pointShadowBlur: 5,
      },
      {
        label: " data two",
        data: [
          80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200,
          280,
        ],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 1),
        borderColor: colors.success,
        borderSkipped: "bottom",
        barThickness: 40,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 5,
        pointBorderColor: "transparent",
        lineTension: 0.5,
        pointStyle: "circle",
        pointShadowOffsetX: 1,
        pointShadowOffsetY: 1,
        pointShadowBlur: 5,
      },
      {
        label: " data three",
        data: [
          80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180,
        ],
        fill: false,
        backgroundColor: hexToRGB(colors.danger, 1),
        borderColor: colors.danger,
        borderSkipped: "bottom",
        barThickness: 40,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 5,
        pointBorderColor: "transparent",
        lineTension: 0.5,
        pointStyle: "circle",
        pointShadowOffsetX: 1,
        pointShadowOffsetY: 1,
        pointShadowBlur: 5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: "#334155",
        },
        ticks: {
          color: "#cbd5e1",
        },
      },
      x: {
        grid: {
          color: "#334155",
        },

        ticks: {
          color: "#cbd5e1",
        },
      },
    },
  },
};

export const radarChart = {
  data: {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

export const radarChartDark = {
  data: {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    maintainAspectRatio: false,
  },
};
export const polarAreaChart = {
  data: {
    labels: ["primary", "success", "warning-500", "info", "danger"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          colors.primary,
          colors.success,
          colors.warning - 500,
          colors.info,
          colors.danger,
        ],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};
export const polarAreaChartDark = {};

import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
const lists = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
];
const typography = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Card title="HTML headings Default">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            All HTML headings, are available. .h1 through .h7 classes are also
            available, for when you want to match the font styling of a heading.
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 flex justify-between py-3 px-6 items-center -mx-6 mt-6 mb-6 font-semibold">
            <span>PREVIEW</span>
            <span>FONT SIZE</span>
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h1>Heading 1</h1>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              60px
            </span>
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h2>Heading 2</h2>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              48px
            </span>
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h3>Heading 3</h3>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              36px
            </span>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h4>Heading 4</h4>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              30px
            </span>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h5>Heading 5</h5>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              24px
            </span>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h6>Heading 6</h6>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              20px
            </span>
          </div>
        </Card>
        <Card title="Light / Bold Headings">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            All HTML headings are available with light and bold font-weight. Use
            .font-weight-normal for light heading and .
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 flex justify-between py-3 px-6 items-center -mx-6 mt-6 mb-6 font-semibold">
            <span>LIGHT HEADINGS</span>
            <span>BOLD HEADINGS</span>
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h1 className="font-light">Heading</h1>
            <h1>Heading</h1>
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h2 className="font-light">Heading 2</h2>
            <h2>Heading 2</h2>
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h3 className="font-light">Heading 3</h3>
            <h3>Heading 3</h3>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="font-light">Heading 4</h4>
            <h4>Heading 4</h4>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h5 className="font-light">Heading 5</h5>
            <h5>Heading 5</h5>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h6 className="font-light">Heading 6</h6>
            <h6>Heading 6</h6>
          </div>
        </Card>
        <div className="lg:col-span-2 col-span-1">
          <Card title="Texts">
            <div className="-mx-6">
              <table className="w-full border-collapse border-none text-left">
                <thead>
                  <tr>
                    <th className="text-xs font-semibold bg-slate-100 dark:bg-slate-700">
                      <span className="px-6 py-5 block text-slate-600 dark:text-slate-300">
                        Type
                      </span>
                    </th>
                    <th className="text-xs font-semibold bg-slate-100 dark:bg-slate-700">
                      <span className="px-6 py-5 block text-slate-600 dark:text-slate-300">
                        Class
                      </span>
                    </th>
                    <th className="text-xs font-semibold bg-slate-100 dark:bg-slate-700">
                      <span className="px-6 py-5 block text-slate-600 dark:text-slate-300">
                        Text
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="text-slate-900 dark:text-slate-300 text-left px-6 py-4 text-lg font-medium">
                      Title
                    </td>
                    <td className="text-slate-900 dark:text-slate-300 text-lg font-medium text-left t px-6 py-4">
                      text-lg
                    </td>
                    <td className="text-slate-900 dark:text-slate-300 text-lg font-medium text-left px-6 py-4">
                      <div>
                        Cupcake ipsum dolor sit amet fruitcake donut chocolate.
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        font-size: 18px / line-height: 28px / font-weight: 500
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="text-slate-700 dark:text-slate-300 text-left px-6 py-4 text-base font-normal">
                      Sub Title
                    </td>
                    <td className="text-slate-700 dark:text-slate-300 text-base font-normaltext-left t px-6 py-4">
                      text-base
                    </td>
                    <td className="text-slate-700 dark:text-slate-300 text-base font-normal text-left px-6 py-4">
                      <div>
                        Cupcake ipsum dolor sit amet fruitcake donut chocolate.
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        font-size: 16px / line-height: 24px / font-weight: 400
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <td className="text-slate-600 dark:text-slate-300 text-left px-6 py-4 text-sm font-normal">
                      Body Text
                    </td>
                    <td className="text-slate-600 dark:text-slate-300 text-base font-sm font-normal text-left t px-6 py-4">
                      text-sm
                    </td>
                    <td className="text-slate-600 dark:text-slate-300 text-sm font-normal text-left px-6 py-4">
                      <div>
                        Cupcake ipsum dolor sit amet fruitcake donut chocolate.
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        font-size: 14px / line-height: 20px / font-weight: 400
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-slate-600 dark:text-slate-300 text-left px-6 py-4 text-xs font-normal">
                      Small Text
                    </td>
                    <td className="text-slate-600 dark:text-slate-300 text-base font-xs font-normal text-left t px-6 py-4">
                      text-xs
                    </td>
                    <td className="text-slate-600 dark:text-slate-300 text-xs font-normal text-left px-6 py-4">
                      <div>
                        Cupcake ipsum dolor sit amet fruitcake donut chocolate.
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        font-size: 12px / line-height: 18px / font-weight: 400
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <Card title="Customizing headings  Default">
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            Use the included utility classes to recreate the small secondary-500
            heading text.
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h1>Display heading</h1>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h2>Display heading</h2>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h3>Display heading</h3>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h4>Display heading</h4>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h5>Display heading</h5>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h6>Display heading</h6>
          </div>
        </Card>
        <Card title="Heading colors">
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            Use the included utility classes to recreate the small secondary-500
            heading text.
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h1 className="text-primary-500">Display heading</h1>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h2 className="text-secondary-500">Display heading</h2>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h3 className="text-success-500">Display heading</h3>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="text-danger-500">Display heading</h4>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h5 className="text-warning-500">Display heading</h5>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h6 className="text-info-500">Display heading</h6>
          </div>
        </Card>

        <Card title="Display Headings">
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            Traditional heading elements are designed to work best in the meat
            of your page content. When you need a heading to stand out, consider
            using a display heading—a larger, slightly more opinionated heading
            style.
          </div>

          <div className="md:flex justify-between items-center mb-6">
            <h1 className="display-1">Display 1</h1>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h2 className="display-2">Display 2</h2>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h3 className="display-3">Display 3</h3>
          </div>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="display-4">Display 4</h4>
          </div>
        </Card>

        <div className="space-y-5">
          <Card title="Inline Text Elements">
            <div className="space-y-4">
              <p className="text-sm font-light text-slate-600 dark:text-slate-300">
                Styling for common inline HTML5 elements.
              </p>
              <p className="text-sm font-light text-slate-900 dark:text-slate-300">
                <del>
                  This line of text is meant to be treated as deleted text.
                </del>
              </p>
              <p className="text-sm font-light text-slate-900 dark:text-slate-300">
                <router-link to="#" className="underline">
                  This line of text is meant to be treated as an addition to the
                  document.
                </router-link>
              </p>
              <p className="text-sm font-light text-slate-900 dark:text-slate-300">
                <del>
                  This line of text is meant to be treated as deleted text.
                </del>
              </p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2 col-span-1">
          <Card title="Text Color">
            <div className="space-y-4">
              <p className="text-sm font-light text-slate-600 dark:text-slate-300">
                Styling for common inline HTML5 elements.
              </p>
              <p className="text-sm font-light text-primary-500">
                Styling for common inline HTML5 elements.
              </p>
              <p className="text-sm font-light text-success-500">
                Styling for common inline HTML5 elements.
              </p>
              <p className="text-sm font-light text-warning-500">
                This is warning-500 text You can archive this adding
                .text-warning-500 class
              </p>
              <p className="text-sm font-light text-danger-500">
                This is danger-500 text You can archive this adding
                .text-danger-500 class
              </p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 col-span-1">
          <Card title="Listing Typography">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-8 text-base mb-6">
                  Unorder list.
                </span>
                <ul className="space-y-3 p-6 rounded-md bg-slate-50 dark:bg-slate-700">
                  {lists.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-900 dark:text-slate-300"
                    >
                      Lorem ipsum dolor sit amet.
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-8 text-base mb-6">
                  list-decimal
                </span>
                <ol className="space-y-3 p-6 rounded-md bg-slate-50 dark:bg-slate-700 lits-by-numbaring custom-list">
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span> Lorem ipsum dolor sit amet.</span>
                    <ol className="lits-by-numbaring">
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ol>
                  </li>
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span> Lorem ipsum dolor sit amet.</span>
                  </li>
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span> Lorem ipsum dolor sit amet.</span>
                  </li>
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span> Lorem ipsum dolor sit amet.</span>
                  </li>
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span> Lorem ipsum dolor sit amet.</span>
                  </li>
                </ol>
              </div>

              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-8 text-base mb-6">
                  Dash list
                </span>
                <ul className="space-y-3 p-6 rounded-md bg-slate-50 dark:bg-slate-700 custom-list">
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span className="font-medium">
                      {" "}
                      Lorem ipsum dolor sit amet.
                    </span>
                    <ul className="lits-by-slash">
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                  </li>
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span className="font-medium">
                      {" "}
                      Lorem ipsum dolor sit amet.
                    </span>
                    <ul className="lits-by-slash">
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                  </li>
                  <li className="text-sm text-slate-900 dark:text-slate-300">
                    <span className="font-medium">
                      {" "}
                      Lorem ipsum dolor sit amet.
                    </span>
                    <ul className="lits-by-slash">
                      <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-8 text-base mb-6">
                  Icon List 1
                </span>
                <ul className="space-y-3 p-6 rounded-md bg-slate-50 dark:bg-slate-700">
                  {lists.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-900 dark:text-slate-300 flex space-x-2 items-center rtl:space-x-reverse"
                    >
                      <span>
                        <Icon icon="heroicons:chevron-double-right" />
                      </span>
                      <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-8 text-base mb-6">
                  Icon List 2
                </span>
                <ul className="space-y-3 p-6 rounded-md bg-slate-50 dark:bg-slate-700">
                  {lists.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-900 dark:text-slate-300 flex space-x-2 items-center rtl:space-x-reverse"
                    >
                      <span>
                        <Icon icon="heroicons:chevron-right" />
                      </span>
                      <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="block text-slate-900 dark:text-slate-300 font-medium leading-8 text-base mb-6">
                  Icon List 3
                </span>
                <ul className="space-y-3 p-6 rounded-md bg-slate-50 dark:bg-slate-700">
                  {lists.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-900 dark:text-slate-300 flex space-x-2 items-center rtl:space-x-reverse"
                    >
                      <span className="h-[6px] w-[6px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                      <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="Blockquotes">
            <div className="space-y-5">
              <blockquote className="text-slate-900 dark:text-slate-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus laudantium omnis fugit ducimus nulla libero temporibus
                corrupti non voluptatem harum?
                <span className="text-sm text-slate-400 block mt-3">
                  Dashcode Admin Template
                </span>
              </blockquote>
              <blockquote className="border-primary-500 text-right text-slate-900 dark:text-slate-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus laudantium omnis fugit ducimus nulla libero temporibus
                corrupti non voluptatem harum?
                <span className="text-sm text-slate-400 block mt-3">
                  Dashcode Admin Template
                </span>
              </blockquote>
              <blockquote className="border-success-500 text-center text-slate-900 dark:text-slate-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus laudantium omnis fugit ducimus nulla libero temporibus
                corrupti non voluptatem harum?
                <span className="text-sm text-slate-400 block mt-3">
                  Dashcode Admin Template
                </span>
              </blockquote>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default typography;

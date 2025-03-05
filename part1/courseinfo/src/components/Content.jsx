import Part1 from "./part/part1"
import Part2 from "./part/part2"
import Part3 from "./part/part3"

const Content = (params) => {
  
  return (
    <>
    <Part1 Part1={params.content[0]}/>
    <Part2 Part2={params.content[1]}/>
    <Part3 Part3={params.content[2]}/>
    </>
  )
}
export default Content
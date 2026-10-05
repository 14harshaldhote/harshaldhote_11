import PostLayout from '../PostLayout';
import { A, Code, Figure, H2, H3, List, Note, P, Pre, Table } from '../Prose';
import PondBudget from '../../components/diagrams/PondBudget';
import dashboard from '../../assets/blog/lotuslab/dashboard.webp';
import compare from '../../assets/blog/lotuslab/compare.webp';
import morning from '../../assets/blog/lotuslab/morning.webp';
import evening from '../../assets/blog/lotuslab/evening.webp';
import night from '../../assets/blog/lotuslab/night.webp';

export default function LotusLab() {
  return (
    <PostLayout slug="lotuslab" links={[{ label: 'Source on GitHub', url: 'https://github.com/14harshaldhote/LotusLab' }]}>
      <H2>Where the idea came from</H2>
      <P>
        There is an old maths puzzle. A lily pad in a pond doubles in size every day, and on day 30 it covers the whole
        pond. On which day was the pond half covered? The answer is day 29, and it surprises people because growth that
        doubles looks slow for a long time and then finishes all at once.
      </P>
      <P>
        I wanted to see that puzzle play out in a real pond. Real ponds are messier than the puzzle: it rains, the sun
        dries the water out, the edges turn to mud, and lotus can only grow where there is water. So I built{' '}
        <strong className="font-medium text-ink">LotusLab</strong>: pick a place and some dates, and it simulates a
        natural lotus pond hour by hour using that place’s real weather.
      </P>

      <Figure
        src={dashboard}
        alt="The LotusLab dashboard: settings on the left, a drawn pond scene in the middle with a time slider and a chart of water depth and lotus cover, and a panel of live numbers on the right."
        caption="The dashboard. Settings on the left, the pond and a time slider in the middle, and every number for the selected minute on the right."
        wide
      />

      <H2>What it does, in one paragraph</H2>
      <P>
        You choose a location (say Pune) and a date range. The backend downloads hourly weather for that place from the
        free <A href="https://open-meteo.com/">Open-Meteo</A> service: temperature, rain, cloud, wind, humidity, sunlight
        and how much water the air can pull out of the ground. It runs the pond model over every hour and sends the
        browser one compact table of results. Then you drag a slider and watch the sky, the sun, rain, the water level
        and the lotus move minute by minute, with no more waiting and no more network calls.
      </P>

      <div className="mt-9 grid gap-3 sm:grid-cols-3">
        {[
          [morning, 'Morning'],
          [evening, 'Dusk'],
          [night, 'Night'],
        ].map(([src, label]) => (
          <figure key={label}>
            <img src={src} alt={`The pond scene at ${label.toLowerCase()}`} loading="lazy" className="w-full rounded-md border border-rule" />
            <figcaption className="mt-2 font-mono text-[12px] text-muted">{label}</figcaption>
          </figure>
        ))}
      </div>

      <H2>Part 1: Following the water</H2>
      <P>
        The pond isn’t a fixed blue shape. Its water is worked out every hour from the weather, and everything you see
        comes from that: where the water edge is, how wide the ring of dry mud is, and how much room the lotus has.
      </P>

      <figure className="mt-9 rounded-lg border border-rule bg-surface p-3 sm:p-6">
        <PondBudget />
        <figcaption className="mt-4 border-t border-rule pt-3 font-mono text-[11.5px] leading-relaxed text-muted">
          Every hour the pond adds up what came in, takes away what went out, and writes both down.
        </figcaption>
      </figure>

      <H3>Every hour, in this order</H3>
      <List
        ordered
        items={[
          'Rain falls straight into the pond.',
          'Rain falls on the land around the pond. The soil works like a sponge: after a dry spell it soaks up most of the rain, and once it is wet most of the rain runs downhill into the pond. Between showers the sponge slowly dries out again.',
          'Water evaporates. Hot, sunny, windy, dry hours lose the most. The amount depends on how big the water surface is right now.',
          'A little water seeps out through the bottom.',
          'If the pond goes above its spill level, the extra water pours over the edge.',
          'From the new amount of water, work out the new depth and the new surface area.',
        ]}
      />

      <H3>Why the bowl shape matters</H3>
      <P>
        A real pond is shaped like a bowl: deep in the middle and shallow at the edges. That has a nice side effect. As the
        pond dries, the water surface gets smaller, so it loses water more slowly. A pond with straight walls wouldn’t
        behave like that.
      </P>
      <P>
        I modelled the bowl as a smooth curve (a paraboloid). The useful part is that the maths works in both directions
        with a simple formula: from depth I get volume and area, and from volume I get depth straight back. No guessing,
        no trial and error on each step, which keeps a year of hourly steps fast.
      </P>
      <Pre>{`area(depth)   = A · depth / H
volume(depth) = A · depth² / (2H)
depth(volume) = √(2 · volume · H / A)

A = surface area at the brim, H = depth at the spill level`}</Pre>

      <H3>Keeping every litre honest</H3>
      <P>
        It is easy to write a simulation where water quietly appears or disappears because of a rounding mistake or a
        bug. To make that impossible to miss, every flow is written into a ledger: rain, runoff, evaporation, seepage and
        overflow, for every hour. At the end, <em>starting water + everything that came in − everything that went out</em>{' '}
        must equal the water that is left.
      </P>
      <P>
        Over a whole year of hourly steps the difference is about <Code>1e-13 m³</Code>, which is just the limit of how
        precisely a computer stores decimal numbers. Every API response reports this number, and the tests fail if it
        ever grows. Two more simple rules guard the edges: losses can never take more water than the pond has, and the
        pond can never hold more than its brim.
      </P>

      <Table
        head={['What happens', 'What the model does']}
        rows={[
          ['30 mm storm over 3 hours', 'Water rises from 1.00 m to 1.14 m. Only 6 m³ fell on the pond itself; 13 m³ ran off the land.'],
          ['20 mm of rain on dry vs. soaked land', 'Dry soil sends 1 mm of it to the pond. Soaked soil sends all 20 mm.'],
          ['A hot, dry week', 'Water drops from 1.00 m to 0.94 m, and the surface shrinks from 133 m² to 126 m².'],
          ['Monsoon burst on a nearly full pond', 'Depth stops at the 1.5 m spill level and 139 m³ flows over the edge in 8 hours.'],
        ]}
      />

      <H2>Part 2: Growing the lotus</H2>
      <P>
        Lotus growth follows the same idea as the puzzle: it grows in proportion to what is already there, until it runs
        out of room. That is called logistic growth. Three things slow it down, each scored from 0 to 1:
      </P>
      <List
        items={[
          'Temperature: best around 30 °C, nothing below 12 °C or above 42 °C.',
          'Sunlight: more light helps, up to a point. At night growth stops.',
          'Water depth: too shallow or too deep and the plant struggles; on dry mud it dies back.',
        ]}
      />
      <P>
        The twist that makes it feel real is that the room available is <em>the water surface right now</em>. When a hot
        week shrinks the pond, the space for lotus shrinks too, and leaves stranded on the mud are lost. Water and
        plants are tied together, the way they are outside.
      </P>
      <P>
        One more detail: the usual way to step growth forward in time can overshoot and go unstable if the step is large.
        I used the exact formula for a logistic step instead, so it stays correct whatever the step size.
      </P>

      <H2>Part 3: Making the slider instant</H2>
      <P>
        This is the part I enjoyed most. A slider only feels good if the picture follows your finger with no delay. A
        30-day run has 720 hourly rows and a year has 8,760, and the slider can stop on any minute in between. Re-running
        the simulation on every drag would be far too slow, so the trick is to do all the hard work once, up front, and
        make every question afterwards cheap.
      </P>

      <H3>Jumping to any minute in constant time</H3>
      <P>
        The backend sends one table with a row for every hour, evenly spaced. Because the spacing is fixed, finding the
        right row is plain arithmetic: <Code>row = (time − start) / one hour</Code>. No searching through the list. Then
        it blends the two neighbouring rows to get the exact minute. The cost is the same for a week or a year, about{' '}
        <strong className="font-medium text-ink">5 microseconds</strong> in the browser, roughly 3,000 times faster than
        one frame on screen.
      </P>

      <H3>Totals between any two moments</H3>
      <P>
        “How much did it rain between Tuesday 3 pm and Friday 9 am?” Adding up every hour in between would get slower the
        longer the range. Instead I store running totals (prefix sums) for each flow. The answer is then one subtraction:
        the running total at Friday minus the running total at Tuesday. Same cost for any range.
      </P>

      <H3>Next sunrise, next sunset, next rain</H3>
      <P>
        The buttons that jump to the next sunrise or the next rain use lists of those moments worked out in advance, and
        a binary search finds the next one after the current time. Even in a year-long run that takes a handful of steps.
      </P>

      <H3>Drawing the lotus without reshuffling</H3>
      <P>
        If the leaves were placed randomly on every frame they would jump around as you drag. Instead there is one fixed
        layout of leaves, generated once from a seed and ordered from the centre outwards. To show 40% cover the scene
        simply draws the first leaves until their area adds up to 40%, found again with a binary search. Leaves appear
        and disappear smoothly and never move.
      </P>

      <H3>Playback that doesn’t depend on your screen</H3>
      <P>
        When you press Play, the simulated time is calculated from the real clock, not from how many frames have been
        drawn. A fast monitor and a slow laptop show the pond at the same moment after the same number of seconds.
      </P>

      <Table
        head={['Operation', 'Time']}
        rows={[
          ['Simulate 30 days (720 hourly steps)', '2.2 ms'],
          ['Simulate a whole year (8,760 steps)', '37 ms'],
          ['Jump to any moment in a year-long run', '7 µs'],
          ['Rain total between any two moments', '4 µs'],
          ['30 days of results, compressed for the browser', '53 KiB'],
        ]}
      />

      <H2>Part 4: What if?</H2>
      <P>
        Once a pond runs on real weather, the obvious next question is “what if it had been hotter, or drier?” LotusLab
        has presets for a monsoon surge, a heatwave, an overcast spell and a drought, plus sliders for your own changes.
        They don’t invent new weather; they adjust the real series. Hotter or windier days raise evaporation, cloudier
        days lower the sunlight and the evaporation that comes with it.
      </P>
      <P>
        You can run the real pond and the what-if pond side by side and see exactly when they start to drift apart. A
        heatmap goes further: it re-runs the whole simulation for every mix of temperature change and rain change (30 full
        runs in well under a tenth of a second) so you can see which one matters more for the lotus.
      </P>

      <Figure
        src={compare}
        alt="LotusLab comparing live weather with a drought scenario: two night scenes side by side, a chart with dashed what-if lines, a summary of how far the two drifted apart, and a green heatmap of final lotus cover for different temperature and rain changes."
        caption="Live weather against a drought, and a heatmap of final lotus cover for every mix of temperature and rain."
        wide
      />

      <H2>Part 5: Being honest about the data</H2>
      <P>
        A simulator is only useful if you know what it is built on, so every result says where its weather came from,
        when it was fetched, whether it came from the cache, and how many gaps had to be filled.
      </P>
      <List
        items={[
          'There is no database. Weather is cached in memory with an expiry time, a size limit, and one shared download when many requests ask for the same thing at once.',
          'If Open-Meteo is down and a recent copy is in the cache, that copy is used and clearly marked as stale.',
          'If there is nothing to fall back on, the API says so with an error and offers a demo mode that is labelled “synthetic weather” everywhere it appears.',
          'Finished results are cached already compressed, so asking again takes about a millisecond.',
          'Depth and lotus cover are always described as model estimates, not measurements.',
        ]}
      />

      <H2>How it is put together</H2>
      <P>
        The backend is Python with FastAPI. The model itself lives in a pure core with no web code in it, so it is easy to
        test on its own. Sun position for every hour uses the NOAA solar algorithm, done for the whole series in one pass
        with NumPy. The frontend is React and TypeScript, with the pond scene drawn in SVG using D3.
      </P>
      <P>
        One rule kept the two halves in sync: the model only runs on the backend. The browser never re-calculates the
        pond, it only looks up and blends rows it was given, so the two can never disagree.
      </P>
      <P>
        There are 69 backend tests covering the things that would quietly break the story: the water balance over a full
        year, overflow never going past the brim, a dry pond never going negative, and wetter soil always producing more
        runoff. Frontend tests check the seek and playback logic, and GitHub Actions runs everything on each push.
      </P>

      <Note title="What I learned">
        Most of the speed didn’t come from clever code in the hot path. It came from choosing the right shape for the
        data up front: an evenly spaced table, running totals, and lists sorted in advance. After that, the questions
        people ask while dragging a slider become simple arithmetic.
      </Note>

      <H2>What’s next</H2>
      <List
        items={[
          'Calibrate the model against measurements from a real pond, so the estimates become predictions.',
          'Replay a past forecast against what the weather actually did.',
          'Move long, multi-year timelines into a Web Worker so the page stays smooth.',
        ]}
      />
      <P>
        The code, the full list of equations and the build plan are on{' '}
        <A href="https://github.com/14harshaldhote/LotusLab">GitHub</A>.
      </P>
    </PostLayout>
  );
}

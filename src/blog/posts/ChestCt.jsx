import PostLayout from '../PostLayout';
import { A, Code, Figure, H2, H3, List, Note, P, Pre, Table } from '../Prose';
import dashboard from '../../assets/blog/chest-ct/dashboard.webp';

const REPO = 'https://github.com/14harshaldhote/DeepLearning-Cancer-disease-classification-MLFlow-DVC';

export default function ChestCt() {
  return (
    <PostLayout slug="chest-ct-classifier" links={[{ label: 'Source on GitHub', url: REPO }]}>
      <H2>The project</H2>
      <P>
        This project looks at a single slice of a chest CT scan and says whether it shows{' '}
        <strong className="font-medium text-ink">adenocarcinoma</strong> (the most common type of lung cancer) or looks{' '}
        <strong className="font-medium text-ink">normal</strong>. Under the hood it is a VGG16 network, a well-known
        image model, fine-tuned on a public dataset of a few hundred CT slices.
      </P>
      <P>
        The first version of it reported <strong className="font-medium text-ink">100% accuracy</strong>. That sounds
        great, and that was the problem. Real medical images are never that easy, so instead of celebrating I went looking
        for the reason. This post is about what I found, how I rebuilt the project so the numbers can be trusted, and the
        engineering around the model that makes it something you could actually run and inspect.
      </P>

      <Note title="Before anything else">
        This is a learning and portfolio project. It is not a medical device and must never be used to make a diagnosis.
      </Note>

      <Figure
        src={dashboard}
        alt="The classifier dashboard: sample CT slices to choose from, a prediction of Adenocarcinoma Cancer at 92.6% confidence with a Grad-CAM heatmap, and a row of test-set metrics, a confusion matrix and training curves."
        caption="The dashboard: pick a held-out scan, get a prediction with a heatmap of where the model looked, and see how it did on the test set."
        wide
      />

      <H2>Why 100% was too good to be true</H2>
      <P>
        A model’s score only means something if it is tested on images it has never seen. When I opened the raw data, I
        found two ways the old test was quietly peeking at the answers.
      </P>

      <H3>1. The same image, many times</H3>
      <P>
        93 of the 148 “normal” images were exact copies of each other, with names like <Code>10 - Copy.png</Code> and{' '}
        <Code>10 - Copy (2).png</Code>. When copies of one image end up in both the training set and the test set, the
        model is being tested on pictures it has already memorised. I now remove duplicates by comparing a fingerprint
        (a hash) of each file’s contents, which catches copies whatever they are called.
      </P>

      <H3>2. Several slices from the same person</H3>
      <P>
        A CT scan is a stack of slices, and the dataset had several slices from the same scan, for example{' '}
        <Code>000005 (3).png</Code> and <Code>000005 (9).png</Code>. Neighbouring slices look very alike. If one goes to
        training and its neighbour goes to testing, the test is again too easy. So the split is now done{' '}
        <em>by scan</em>: every scan goes entirely into training, validation or test, never across them.
      </P>

      <Table
        head={['Class', 'Files', 'Duplicates removed', 'Unique scans', 'Train / Val / Test']}
        rows={[
          ['Adenocarcinoma', '195', '1', '107', '133 / 30 / 31'],
          ['Normal', '148', '93', '21', '33 / 11 / 11'],
          ['Total', '343', '94', '128', '166 / 41 / 42'],
        ]}
      />

      <P>
        On a clean, leak-free test set the model scores <strong className="font-medium text-ink">97.6% accuracy</strong>:
        it caught 30 of 31 cancer slices and cleared all 11 normal ones. That is lower than 100%, and it is the number I
        trust. The test set is small (42 images, so one mistake moves accuracy by about 2.4 points), and I say so wherever
        the number appears.
      </P>

      <Table
        head={['Accuracy', 'Cancer caught (sensitivity)', 'Normal cleared (specificity)', 'Macro F1']}
        rows={[['97.6%', '96.8%', '100%', '97.0%']]}
      />

      <H2>The bug that made everything “Normal”</H2>
      <P>
        While testing the old web API I noticed something odd: every scan came back as Normal. The cause was one small
        step. During training, every pixel was divided by 255 so values sit between 0 and 1. The API skipped that step,
        so the model was being shown images a few hundred times brighter than anything it had learned from.
      </P>
      <P>
        The fix was to put the image preparation in one shared function that both training and the API use, so they can’t
        drift apart again. I also added a test that runs the bundled sample scans through the real prediction code and
        fails if any of them is classified wrongly. A bug like this now breaks the build instead of reaching users.
      </P>

      <H2>A pipeline you can run again</H2>
      <P>
        Machine learning projects often live in notebooks where nobody remembers which cell was run in which order. I
        split the work into five clear stages and let <strong className="font-medium text-ink">DVC</strong> (Data
        Version Control) manage them:
      </P>
      <List
        ordered
        items={[
          'Data ingestion: unpack the dataset.',
          'Data preparation: remove duplicates and split by scan.',
          'Base model: load VGG16 with its ImageNet knowledge.',
          'Training: teach it the two classes.',
          'Evaluation: score it on the held-out test set.',
        ]}
      />
      <P>
        DVC records exactly which code, data and settings each stage used. When I change something, <Code>dvc repro</Code>{' '}
        re-runs only the stages affected by that change and skips the rest. All the settings (image size, learning rate,
        split sizes, thresholds) live in one <Code>params.yaml</Code> file instead of being scattered through the code.
      </P>
      <Pre>{`dvc repro          # re-run only what changed
dvc metrics show   # test results from the last run
mlflow ui          # browse every experiment`}</Pre>

      <H3>Tracking experiments with MLflow</H3>
      <P>
        Every evaluation is logged to <strong className="font-medium text-ink">MLflow</strong>: the settings used and the
        results. That makes it easy to compare runs and see whether a change actually helped. The old version had a
        tracking password written in the README; now credentials only come from environment variables.
      </P>

      <H3>A quality gate before deployment</H3>
      <P>
        A newly trained model doesn’t automatically replace the one being served. The evaluation stage checks it against a
        minimum bar (85% test accuracy), and only a model that passes is promoted. A bad training run can’t silently ship.
      </P>

      <H2>Training choices, in plain words</H2>
      <List
        items={[
          'Transfer learning: VGG16 already knows edges, textures and shapes from millions of everyday photos. I keep that part frozen and train only a small new head on top for the two classes.',
          'A lighter head: the old version flattened everything into a huge layer that trained unstably. Global average pooling plus dropout is smaller and steadier.',
          'Class weights: after removing duplicates there are far fewer normal images, so mistakes on normal images count for more during training.',
          'Augmentation: small random rotations, shifts and zooms, so the model learns the anatomy rather than the exact framing.',
          'Early stopping: watch the validation score and keep the best weights instead of whatever the last epoch produced.',
        ]}
      />

      <H2>Showing its work</H2>
      <P>
        A doctor would never accept “trust me” from a colleague, so a model shouldn’t get away with it either. Three things
        help a human check the model:
      </P>
      <List
        items={[
          <>
            <strong className="font-medium text-ink">Grad-CAM heatmaps.</strong> Every prediction comes with a heatmap that
            glows where the model’s last layers paid the most attention. If it lights up something outside the lungs, that
            is a warning sign, and I note in the model card that this sometimes happens.
          </>,
          <>
            <strong className="font-medium text-ink">“Needs expert review”.</strong> Any prediction below 80% confidence is
            flagged instead of being presented as an answer.
          </>,
          <>
            <strong className="font-medium text-ink">An audit trail.</strong> The API keeps a list of recent predictions
            (time, result, confidence, how long it took). It stores no images.
          </>,
        ]}
      />

      <H2>Serving it properly</H2>
      <P>
        The model is served with <strong className="font-medium text-ink">FastAPI</strong>, which also gives free,
        interactive API docs. A few changes from the first version made a big difference:
      </P>
      <List
        items={[
          'The model is loaded once when the server starts, not from disk on every request.',
          'The old public /train endpoint, which let anyone start a training run, is gone. Training only happens through the pipeline.',
          'Uploads are checked for type and size before they reach the model.',
          'There is a health check, so a deployment platform can tell when the service is ready.',
        ]}
      />

      <H3>A tool for AI agents</H3>
      <P>
        I also wrapped the classifier as an MCP server (Model Context Protocol). That lets an AI assistant call it as a
        tool, for example “classify this CT slice”, and get back the label, the confidence and the review flag, the same as
        any other client.
      </P>

      <H2>Tests, CI and Docker</H2>
      <P>
        The project has a pytest suite covering data preparation, the evaluation metrics, the prediction pipeline, the API
        and the MCP server, and ruff for linting. GitHub Actions runs lint and tests on every push, then builds the Docker
        image and starts it as a smoke test. Previously the CI steps only printed text and deployment ran on every push;
        now deployment to AWS (ECR and EC2) only happens when started by hand. The Docker image runs as a non-root user.
      </P>

      <H2>Limits I’m upfront about</H2>
      <List
        items={[
          'The dataset is small and comes from one source, so the model will not work on other scanners or hospitals without retraining and proper validation.',
          'It looks at single slices. Real CT reading uses the whole 3D scan and the patient’s history.',
          'It only knows two classes, so anything else gets forced into one of them.',
          'All of this is written down in a model card, along with a note on how medical AI is regulated.',
        ]}
      />

      <Note title="What I learned">
        The most important work in this project wasn’t the neural network. It was checking the data, distrusting a perfect
        score, and building the pipeline, tests and explanations that let anyone see how the result was produced. A lower
        number you can defend is worth more than a perfect one you can’t.
      </Note>

      <P>
        The code, model card and full pipeline are on <A href={REPO}>GitHub</A>.
      </P>
    </PostLayout>
  );
}

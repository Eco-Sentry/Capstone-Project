import cProfile
import pstats
import io

def profile_code():
    pr = cProfile.Profile()
    pr.enable()

    # Place the code you want to profile here
    generate_heatmap_task(params)

    pr.disable()
    s = io.StringIO()
    sortby = 'cumulative'
    ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
    ps.print_stats()
    print(s.getvalue())

profile_code()
